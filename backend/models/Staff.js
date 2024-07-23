const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Staff = sequelize.define('Staff', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specializations: {
    type: DataTypes.JSON // To store array of specializations
  },
  availability: {
    type: DataTypes.JSON // To store start and end times
  }
});

module.exports = Staff;
