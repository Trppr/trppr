const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('review', {
  driver: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
});


sequelize
  .sync()
  .then(function(err){
    console.log("review model sync() successful");
  }, function(err) {
    console.log('An error occurred while creating the review table', err)
  })

  module.exports = Review;
