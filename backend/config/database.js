const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize
const sequelize = new Sequelize('salon_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Set to true to enable SQL query logging
});

module.exports = sequelize;
