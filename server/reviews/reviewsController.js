const Review = require('../reviews/reviewsModel');
const User = require('../users/userModel');
const sequelize = require('sequelize');



module.exports = {
  createReview: function(req, res) {
    User.find({
      where: {
        email : req.body.email
      }, attributes : ['id']
    })
    .then(function(data){
      if (data){
        // console.log("user data: ", data)
        //where attribute fields are updated
        Review.bulkCreate([{
          userId : data.dataValues.id,
          description: req.body.description
        }])
        .then(function(){
          res.status(200).send("Review Submitted")
        })
      } else {
        res.status(400).send("E-mail does not exist")
        // console.log("error: ", data)
      }
    })

  }
}
