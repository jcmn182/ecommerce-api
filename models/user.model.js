const { DataTypes } = require('sequelize');

//utils
const {db} = require('../utils/db.js');

const Users = db.define('users',{

    id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	userName: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
		unique: true,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	phone: {
		type: DataTypes.STRING(10),
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING(10),
		defaultValue: 'active',
		allowNull: false
	},
	role: {
		type: DataTypes.STRING(10),
		allowNull: false,
		defaultValue: 'guest',
	}
})

module.exports = { Users };