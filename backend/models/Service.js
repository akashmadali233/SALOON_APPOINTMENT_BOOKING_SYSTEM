const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false // Duration in minutes
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Service;
