const express = require('express');

// Controller
const {
	createProduct,
	getAllProducts,
	getProductsById,
	updateProduct,
	disableProduct
} = require('../controllers/products.controller');

// Middlewares
const {
	validateSession
	// protectAdmin,
} = require('../middlewares/auth.middlewares');

const { protecProductstAccountOwner } = require('../middlewares/protectAccount.middleware')
 
const { productExists } = require('../middlewares/products.middleware.js');
/*const {
	createProductValidations,
	createCategoryValidations,
	validateResult,
} = require('../middlewares/validators.middleware');*/
// const { productExists } = require('../middlewares/products.middleware');

//onst { multerUpload } = require('../utils/multer'); // multipart/form-data

const router = express.Router();

router.use(validateSession);

// Get all products
//Create new product
router
	.route('/')
	.get(getAllProducts)
	.post(createProduct);

// Get produts listed by the user
//router.get('/user-products', getUserProducts);

// Get product's details
// Update product
// Remove product
router
	.use('/:id', productExists)
	.route('/:id')
	.get(getProductsById)
	.patch(protecProductstAccountOwner, updateProduct)
	.delete(protecProductstAccountOwner, disableProduct);

module.exports = { productsRouter: router };
