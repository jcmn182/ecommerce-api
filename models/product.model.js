const { DataTypes } = require('sequelize');
const { db } = require('../utils/db.js');
//const { AppError } = require('../utils/appError.js');

const Product = db.define(
	'product',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: 'false',
			// active | deleted | soldOut
			defaultValue: 'active'
			/*validate: {
				checkStatus(val) {
					const status = ['active', 'deleted', 'soldOut'];

					if (!status.includes(val))
						throw new AppError('Not a valid status', 500);
				},
			}*/
		},
	},
);

module.exports = { Product };
