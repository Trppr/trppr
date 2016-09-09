const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../users/userModel');

const Review = sequelize.define('review', {
  description: Sequelize.TEXT,
});

Review.belongsTo(User);


sequelize
  .sync()
  .then(function(err){
    console.log("review model sync() successful");
  }, function(err) {
    console.log('An error occurred while creating the review table', err)
  })

module.exports = Review;
