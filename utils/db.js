const { Sequelize } = require('sequelize');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') })

const db = new Sequelize({
    
	host: process.env.DB_HOST_HEROKU,
	username: process.env.DB_USER_NAME_HEROKU, 
	password: process.env.DB_PASSWORD_HEROKU,
	port: 5432,
	database: process.env.DB_HEROKU,
	dialect: 'postgres',
	logging: false,
    dialectOptions: {
        		ssl: {
        			require: true,
         			rejectUnauthorized: false,
        		},
        	}
});



module.exports = { db };