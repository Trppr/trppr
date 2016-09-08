const Review = require('../reviews/reviewsModel');
const sequelize = require('sequelize');



module.exports = {
  createReview: function(req, res) {
    const newReview = Review.build({
      driver: req.body.driver,
      description: req.body.description
    });

    newReview
      .save()
      .then(function(){
        res.sendStatus(201)
      })
      .catch(function(err){
        console.log('Error: ', err)
      })
  }
}
