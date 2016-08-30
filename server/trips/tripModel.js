const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../users/userModel');

const Trip = sequelize.define('trip', {
  driverName: Sequelize.STRING,
  tripDate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startLocation: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endLocation: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numSeats: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  seatPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  vehicleType: Sequelize.STRING,
  description: Sequelize.TEXT,
  driverId: Sequelize.INTEGER
});
// Associations/foreign key relationships:
Trip.belongsTo(User, {as: 'driver'});
// One-to-one relationship between trip and driver.
Trip.belongsToMany(User, { as: 'passengers', through: 'tripPassengers'});
// One-to-many relationship between trip and passengers. Using 'through' creates
// a join table automatically.

sequelize
  .sync()
  .then(function(err) {
    console.log('\033[34m <TRPPR> Trip model sync() successful. \033[0m');

  }, function(err) {
    console.log('An error occurred while creating the table:', err);
  });

module.exports = Trip;
