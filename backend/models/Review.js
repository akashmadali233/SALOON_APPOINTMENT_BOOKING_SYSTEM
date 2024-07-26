// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('./User'); // assuming you have User model
// const Service = require('./Service'); // assuming you have Service model

// const Review = sequelize.define('Review', {
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: User,
//       key: 'id'
//     }
//   },
//   serviceId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Service,
//       key: 'id'
//     }
//   },
//   rating: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       min: 1,
//       max: 5
//     }
//   },
//   comment: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   },
//   response: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   }
// });


// module.exports = Review;
