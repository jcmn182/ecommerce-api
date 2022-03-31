const { Users } = require('../models/user.model.js');
const { Product } = require('../models/product.model.js');



const models = () => {
   
    Users.hasMany(Product);
	  Product.belongsTo(Users);
};
  
  module.exports = { models };