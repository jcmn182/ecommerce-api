//const { Op } = require('sequelize');

// Models
const { Product } = require('../models/product.model.js');
const { User } = require('../models/user.model.js');

// Utils
const { AppError } = require('../utils/appError.js');
const { catchAsync } = require('../utils/catchAsycn.js');
const { filterObj } = require('../utils/filterObj.js');

//const { formatProducts, formatProduct } = require('../utils/queryFormat');

// Products functions
exports.getAllProducts = catchAsync(async (req, res, next) => {
	const products = await Product.findAll({
		where: {
			status: 'active',
			//title: { [Op.substring]: req.query.query || '' },
		},
		/*include: [
			{
				model: User,
				attributes: { exclude: ['password'] },
			},
			{
				model: ProductImg,
				where: { status: 'active' },
				attributes: ['imgPath'],
			},
			{
				model: Category,
				where: req.query.category ? { id: req.query.category } : null,
			},
		]*/
	});

	//const resolvedProducts = await Promise.all(productsPromises);
	// Get images url from Firebase
	//const formattedProducts = formatProducts(resolvedProducts);

	res.status(200).json({
		status: 'success',
		data: { products },
	});
});

exports.createProduct = catchAsync(async (req, res, next) => {
	const { title, description, price } = req.body;
	const { currentUser } = req;

	const newProduct = await Product.create({
		title,
		description,
		price,
		userId: currentUser.id,
	});

	res.status(201).json({ status: 'success', data: { newProduct } });
});

exports.updateProduct = catchAsync(async (req, res, next) => {

	const { product } = req;

	const filteredObj = filterObj(
		req.body,
		'name',
		'description',
		'price',
	);

	//if (filteredObj.quantity && filteredObj.quantity < 0) {
	//	return next(new AppError('Invalid product quantity', 400));
	//}

	await product.update({
		...filteredObj,
	});

	res.status(204).json({ status: 'success' });
});

exports.disableProduct = catchAsync(async (req, res, next) => {
	const { product } = req;

	await product.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

exports.getProductsById = catchAsync(async (req, res, next) => {
	const { id } = req.params;
  
	// SELECT * FROM posts WHERE id = 1;
	const product = await Product.findOne({
	  where: { id: id, status: 'active' }
	});
  
	if (!product) {
	  return next(new AppError(404, 'No post found with the given ID'));
	}
  
	res.status(200).json({
	  status: 'success',
	  data: {
		product
	  }
	});
  });