const jwt = require('jsonwebtoken');
const User = require('../users/userModel');

module.exports = {
  createUser: function(req, res) {

    const newUser = User.build({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      description: req.body.description,
    });

    newUser
      .save()
      .then(function() {
        console.log("<TRPPR> new user created");
        res.sendStatus(201);
      })
      .catch(function(err) {
        console.log('Error:', err);
      });
  },

  getAllUsers: function(req, res) {

    var userList = [];
    User.findAll({
      attributes: ['id', 'email', 'name', 'description']
    })
    .then(function(users) {
      for(var i = 0; i < users.length; i++){
        userList.push(users[i].dataValues);
      }
      console.log(userList);
      // send response?
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  getUser: function(req, res) {
    User.findOne({
      where: {
        id: req.body.id
      },
      attributes: ['id', 'email', 'name', 'description']
    })
    .then(function(user) {
      console.log(user.dataValues);
      //res.send(user.dataValues);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  authenticateUser: function(req, res) {

    if(!req.body.username){
      res.status(400).send('username required');
      return;
    }
    if(!req.body.password){ // should be encrypted
      res.status(400).send('password required');
      return;
    }

    // look up username/email
      // compare hashes
      // if true ->
    //test login with JWTs
    if(req.body.username === 'john' && req.body.password === '123'){
      const myToken = jwt
      .sign({ username: req.body.username }, 'hello world trppr');
      //             ^---user object            ^---- secret
      res.status(200).json(myToken);
    } else {
      res.status(401).send('invalid login');
    }

  });

}
