const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type:Sequelize.STRING,
    allowNull: false
  },
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
});

sequelize
  .sync() // { force: true } drops table before recreating it
  .then(function(err) {
    console.log('sync() successful.');
  }, function(err) {
    console.log('An error occurred while creating the table:', err);
  });

// .build() creates a model instance, needs to be saved using .save()
// .create() builds and saves`

// const testUser = User.build({
//   name: "John",
//   password: "1234",
//   email: "user2@domain.com",
//   description: "test user data",
//   joinDate: Date.now()
// });
//
// testUser
//   .save()
//   .then(function() {
//     console.log("save() successful");
//   })
//   .catch(function (err) {
//     console.log('Error:', err);
//   });
