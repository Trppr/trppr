const user = require('userModel');

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
  getUser: function() {}
}
