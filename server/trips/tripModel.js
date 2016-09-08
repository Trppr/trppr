const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../users/userModel');

const Trip = sequelize.define('trip', {
  driverName: Sequelize.STRING,
  tripDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  startSt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startState: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endSt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endState: {
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
  vehicleMake: Sequelize.STRING,
  vehicleModel: Sequelize.STRING,
  vehicleYear: Sequelize.STRING,
  description: Sequelize.TEXT,
  driverId: Sequelize.INTEGER
});

// const tripPassengers = sequelize.define('tripPassengers', {});


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
