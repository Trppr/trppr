const jwt = require('jsonwebtoken');
const User = require('../users/userModel');
const Trip = require('../trips/tripModel');
const password = require('../config/passwordHelper');
const sequelize = require('../config/database');

const braintree = require('braintree');

var gateway = braintree.connect({
  accessToken: 'access_token$sandbox$vf5pkqztz5zw3nd6$4676b0609a3a65e34c93ec60d58a5adb'
});

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
      .then(function(user) {
        password.hash(req.body.password)
          .then(function(hash) {
            newUser.update({
              password: hash
            });
          })
          .catch(function(error) {
            console.log("Password hashing error: ", erorr);
          })
        const token = jwt.sign(user.dataValues, 'hello world trppr');
        console.log("\033[34m <TRPPR> New user created. \033[0m");
        res.json({
          user: user,
          token: token
        });
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
            ///////////////////
            gateway.clientToken.generate({}, function (err, response) {
                  const token = jwt.sign(user.dataValues, 'hello world trppr');
                  console.log('\033[34m <TRPPR> User logged in. \033[0m');
                  console.log("client token route");
                  res.json({
                  user: user,
                  token: token,
                  payToken: response.clientToken
                 });
                  //res.send(response.clientToken);
                });

            ///////////////
            // res.json({
            //   user: user,
            //   token: token
            // });
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

  updateUser: function(req, res){
    console.log('in server updateuser')
    User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        description: req.body.description,
      },
      {
        where: {
          id: req.body.userId
        }
      })
      .then(function(user) {
        if(req.body.password) {
          password.hash(req.body.password)
            .then(function(hash) {
              user.update({
                password: hash
              });
            })
        }
        console.log("\033[34m <TRPPR> User updated. \033[0m");
        res.sendStatus(201);
      })


  },

  getDriverHistory: function(req, res){
    var tripsList = [];
    Trip.findAll({
      where: {
        driverId: req.body.driverId
      },
      attributes: [
        'id',
        'tripDate',
        'startSt',
        'startCity',
        'startState',
        'endSt',
        'endCity',
        'endState',
        'numSeats',
        'seatPrice',
        'vehicleMake',
        'vehicleModel',
        'vehicleYear',
        'description'
      ]
    })
    .then(function(trips){
      trips.forEach( (trip) => {
        tripsList.push(trip.dataValues);
      });
      console.log('\033[34m <TRPPR> Sending data: \033[0m');
      console.log(tripsList);
      res.json(tripsList);
    })
    .catch(function(err) {
      console.log('Error:', err.message);
      res.send(err.message);
    });
  },

  getPassengerHistory: function(req, res){
    var tripsList = [];

    sequelize.query("SELECT * FROM \"tripPassengers\"", { type: sequelize.QueryTypes.SELECT})
    .then(function(tripsRelationships) {
    // We don't need spread here, since only the results will be returned for select queries
      console.log(tripsRelationships);
    });
  }
}
