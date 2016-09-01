const jwt = require('jsonwebtoken');
const User = require('../users/userModel');
const bcrypt = require('bcrypt');



module.exports = {

  createUser: function(req, res) {

    const newUser = User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      description: req.body.description,
    });

    function hashPass(){
      return new Promise(function(resolve, reject){
        bcrypt.hash(req.body.password, 10, function(error, hash) {
          if(error){
            reject(error);
          }
          else{
            resolve(hash);
          }
        });
      })
    }

    newUser
      .save()
      .then(function() {

        hashPass()
          .then(function(hash){
            newUser.update({ password: hash });
          })
          .catch(function(error){
            console.log("Password hashing error: ", erorr);
          })

        console.log("<TRPPR> new user created");
        res.sendStatus(201);
      })
      .catch(function(err) {
        console.log('Error:', err.errors);
        var errorString = "Error: ";
        for(var i = 0; i < err.errors.length; i++){
          errorString += "\n " + err.errors[i].message;
        }
        console.log(errorString);
        res.status(500).send(errorString);
      });
  },

  authenticateUser: function(req, res) {

    if(!req.body.email){
      res.status(500).send('Email address required.');
      return;
    }
    if(!req.body.password){
      res.status(500).send('Password required.');
      return;
    }

    User.findOne({
      where: {
        email: req.body.email
      },
      attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'description']
    })
    .then(function(user) {

      function checkPass(){
        return new Promise(function(resolve, reject){
          bcrypt.compare(req.body.password, user.password, function(error, result) {
            if(result){
              console.log('result = ', result);
              console.log('req.body.password = ', req.body.password);
              console.log('user.password = ', user.password);
              resolve(result);
            }
            reject(error)
          });
        })
      }

      checkPass()
        .then(function(result){
          const token = jwt.sign(user.dataValues, 'hello world trppr');
          res.json({
            success: true,
            message: 'Welcome!',
            user: user,
            token: token
          });
        })
        .catch(function(error){
          res.status(500).send('Password incorrect.');
        })

    })
    .catch(function(err) {
      console.log('Error:', err);
      res.status(500).send('Login information incorrect.');
    });

  },

}
