//tools
const bcrypt = require('bcryptjs');
//jwt
const jwt = require('jsonwebtoken');
// dot env
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

//Models
const { Users } = require('../models/user.model.js');
const { Product } = require('../models/product.model.js')

// Utils
const { AppError } = require('../utils/appError.js');
const { catchAsync } = require('../utils/catchAsycn.js');
const { filterObj } = require('../utils/filterObj.js');
 
exports.getAllUsers = catchAsync(async (req, res, next) => {
  
    const users = await Users.findAll({
        where: { status: 'active' },
        //include: [
          //{ model: Posts },
        //],
        order:[["id", "desc"]]
      });
    res.status(200).json({
        status: 'success',
        data: { users }
      });

});

exports.getUserById = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;

    const user = await Users.findOne({ where: { id } });

    if (!user) {
        return next(new AppError(404, 'User not found'));
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });


});

exports.createNewUser = catchAsync(async (req, res, next) => {
  
    const {phone, lastName, firstName, userName, email, password, role} = req.body;

    if (!userName || !email || !password || !role) {
        return next(
          new AppError(400, 'Must provide a valid values')
        );
      }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await Users.create({
        firstName,
        lastName,
        userName,
        email,
        phone,
        password:hashedPassword,
        role
      });

      // Remove password from response
      newUser.password = undefined;

      res.status(201).json({
        status: 'success',
        data: { newUser }
      });

});

exports.loginUser = catchAsync(async (req, res, next) => {
  
  const { email, password } = req.body;

  // Find user given an email and has status active
  const user = await Users.findOne({
    where: { email, status: 'active' }
  })

 // Compare entered password vs hashed password
 if (!user || !(await bcrypt.compare(password, user.password))) {
  return next(new AppError(400, 'Credentials are invalid'));
}

    const token = await jwt.sign(
      { id:user.id }, // Token payload
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.status(200).json({
      status: 'success',
      data: {user, token} 
    });

});

exports.getproductsbyUserId = catchAsync(async (req, res, next) => {

  const { currentUser } = req;

  const userProducts = await Product.findAll({
    where: { userId: currentUser.id, status: 'active' }
  });

  res.status(200).json({
    status: 'success',
    data: {userProducts} 
  });
  

});

exports.updateUser = catchAsync(async (req, res, next) => {
  
    const { id } = req.params;
    const data = filterObj( req.body, 'userName', 'email', 'password', 'role' ); // { title } | { title, author } | { content }

    const user = await Users.findOne({
      where: { id: id, status: 'active' }
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update user, invalid ID'
      });
      return;
    }

    await user.update({ ...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });


});

exports.deleteUser = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;

    const user = await Users.findOne({
      where: { id: id, status: 'active' }
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete user, invalid ID'
      });
      return;
    }

    // Soft delete
    await user.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });

});