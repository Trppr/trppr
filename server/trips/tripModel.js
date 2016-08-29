const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('../users/userModel');

const Trip = sequelize.define('trip', {
  driverName: Sequelize.STRING,
  tripDate: Sequelize.STRING,
  startLocation: Sequelize.STRING,
  endLocation: Sequelize.STRING,
  numSeats: Sequelize.INTEGER,
  seatPrice: Sequelize.INTEGER,
  vehicleType: Sequelize.STRING,
  description: Sequelize.TEXT
});
Trip.belongsTo(User, {as: 'driver'});
Trip.belongsToMany(User, { as: 'passengers', through: 'tripPassengers'});

sequelize
  .sync() // { force: true } drops table before recreating it
  .then(function(err) {
    console.log('sync() successful.');
  }, function(err) {
    console.log('An error occurred while creating the table:', err);
  });

// const testTrip = Trip.build({
//   driverName: "Bob",
//   tripDate: "monday",
//   startLocation: "LA",
//   endLocation: "SF",
//   numSeats: "2",
//   seatPrice: "20",
//   vehicleType: "Sports car",
//   description: "road trip description",
//   driverId: "1"
// });
// testTrip.setPassengers('3');
// testTrip
//   .save()
//   .then(function() {
//     console.log("save() successful");
//   })
//   .catch(function (err) {
//     console.log('Error:', err);
//   });

module.exports = Trip;
