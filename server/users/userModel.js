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
    console.log('<TRPPR> user model sync() successful.');
  }, function(err) {
    console.log('An error occurred while creating the table:', err);
  });

module.exports = User;
