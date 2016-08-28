const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  description: Sequelize.STRING,
  joinDate: Sequelize.DATE
});

sequelize
  .sync() // { force: true } drops table before recreating it
  .then(function(err) {
    console.log('It worked!');
  }, function(err) {
    console.log('An error occurred while creating the table:', err);
  });

const user = User.build({
  name: "John",
  password: "1234",
  email: "user@domain.com",
  description: "test user data",
  joinDate: Date.now()
});

user.save().then(function() {
  console.log("saved!");
})
