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
        console.log("new user created");
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
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  }

}
