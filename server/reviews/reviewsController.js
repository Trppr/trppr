const Review = require('../reviews/reviewsModel');
const User = require('../users/userModel')
const sequelize = require('sequelize');



module.exports = {
  createReview: function(req, res) {
    User.findOne({
      where : {
        id: req.body.userId
      }
    })
    const newReview = Review.build({
      description: req.body.description
    });

    newReview
      .save()
      .then(function(){
        res.sendStatus(201).send(newReview)
      })
      .catch(function(err){
        console.log('Error: ', err)
      })
  }
}
