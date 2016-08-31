const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
});

sequelize
  .sync() // { force: true } drops table before recreating it
  .then(function(err) {
    console.log('\033[34m <TRPPR> User model sync() successful. \033[0m');

  }, function(err) {
    console.log('An error occurred while creating the table:', err);
  });

module.exports = User;
