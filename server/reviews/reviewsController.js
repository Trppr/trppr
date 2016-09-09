const Review = require('../reviews/reviewsModel');
const User = require('../users/userModel');
const sequelize = require('sequelize');



module.exports = {
  createReview: function(req, res) {
    console.log('req.query in reviews ctrllr' ,req)
    User.find({
      where: {
        email : req.query.userEmail
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

  },

  getReviews: function(req, res){

    console.log('req.body in getreviews: ', req.query)
    User.find({
      where: {
        email : req.query.userEmail
      }, attributes : ['id']
    })
    .then(function(data){
      if (data){
        console.log("data on ln 44 " , data)
        // console.log("user data: ", data)
        //where attribute fields are updated
        Review.findAll({
          where : {
            userId : data.dataValues.id
          },
          attributes : ['description']
        })
        .then(function(data){
          console.log("data on ln 51 " , data)
          res.status(200).json(data)
        })
      } else {
        res.status(400).send("E-mail does not exist")
        // console.log("error: ", data)
      }
    })
  }

}
