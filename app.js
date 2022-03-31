const express = require('express');

//controllers 
const { globalErrorHandler } = require('./controllers/error.controller.js');

//routes
const {usersRouter} = require('./routes/users.router');
const {productsRouter} = require('./routes/products.router');

//Utils
const {AppError} =require('./utils/appError.js');

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);

app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server.`));
});
  
// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };