// Models
const { Product } = require('../models/product.model');
const { Users } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError.js');
const { catchAsync } = require('../utils/catchAsycn.js');

exports.productExists = catchAsync(async (req, res, next) => {

	const { id } = req.params;

	const product = await Product.findOne({
		where: { id, status: 'active' },
		include: [
			{ model: Users, attributes: { exclude: ['password'] } }
		],
	});

	if (!product) {
		return next(new AppError('No product found', 404));
	}

	req.product = product;

	next();
});