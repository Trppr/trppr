const jwt = require('jsonwebtoken');
const User = require('../users/userModel');
const password = require('../config/passwordHelper');

module.exports = {

  createUser: function(req, res) {
    const newUser = User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      description: req.body.description,
    });
    newUser
      .save()
      .then(function() {
        password.hash(req.body.password)
          .then(function(hash) {
            newUser.update({
              password: hash
            });
          })
          .catch(function(error) {
            console.log("Password hashing error: ", erorr);
          })
        console.log("\033[34m <TRPPR> New user created. \033[0m");
        res.sendStatus(201);
      })
      .catch(function(err) {
        var errorString = "Error:";
        err.errors.forEach((err) => {
          errorString += "\n" + err.message;
        });
        console.log(errorString);
        res.status(500).send(errorString);
      });
  },

  authenticateUser: function(req, res) {
    if (!req.body.email) {
      res.status(500).send('Email address required.');
    }
    if (!req.body.password) {
      res.status(500).send('Password required.');
    }
    User.findOne({
        where: {
          email: req.body.email
        },
        attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'description']
      })
      .then(function(user) {
        password.compare(req.body.password, user.password)
          .then(function(result) {
            const token = jwt.sign(user.dataValues, 'hello world trppr');
            console.log('\033[34m <TRPPR> User logged in. \033[0m');
            res.json({
              user: user,
              token: token
            });
          })
          .catch(function(error) {
            res.status(500).send('Password incorrect.');
          })
      })
      .catch(function(err) {
        console.log('Error:', err);
        res.status(500).send('Login information incorrect.');
      });

  },

}
