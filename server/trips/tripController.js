const Trip = require('../trips/tripModel');
const sequelize = require('sequelize');

module.exports = {
  createTrip: function(req, res){
    const newTrip = Trip.build({
      driverName: req.body.driverName,
      tripDate: req.body.tripDate,
      startLocation: req.body.startLocation,
      endLocation: req.body.endLocation,
      numSeats: req.body.numSeats,
      seatPrice: req.body.seatPrice,
      vehicleType: req.body.vehicleType,
      description: req.body.description,
      driverId: req.body.driverId
    });

    newTrip
      .save()
      .then(function() {
        console.log("\033[34m <TRPPR> New trip created. \033[0m");
        res.sendStatus(201);
      })
      .catch(function(err) {
        console.log('Error:', err);
      });
  },

  reserveSeat: function(req, res){

    Trip.findOne({
      where: {
        id: req.body.tripId
      }
    })
    .then(function(trip) {
      trip.setPassengers(req.body.passengerId);
      console.log("\033[34m <TRPPR> Seat reserved. \033[0m");
      res.sendStatus(201);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  getAllTrips: function(req, res){
    var tripsList = [];
    Trip.findAll({
      attributes: [
        'id',
        'driverName',
        'tripDate',
        'startLocation',
        'endLocation',
        'numSeats',
        'seatPrice',
        'vehicleType',
        'description',
        'driverId'
      ]
    })
    .then(function(trips){
      for(var i = 0; i < trips.length; i++){
        tripsList.push(trips[i].dataValues);
      }
      console.log('\033[34m <TRPPR> Sending data: \033[0m');
      console.log(tripsList);
      res.json(tripsList);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  getTripsByStart: function(req, res){
    var tripsList = [];
    var startLocation = req.body.startLocation; // || something else?

    Trip.findAll({
      where: {
        startLocation: {
          $iLike: startLocation
        }
      },
      attributes: ['id', 'driverName', 'tripDate', 'startLocation', 'endLocation',
        'numSeats', 'seatPrice', 'vehicleType', 'description']
    })
    .then(function(trips){
      for(var i = 0; i < trips.length; i++){
        tripsList.push(trips[i].dataValues);
      }
      console.log('\033[34m <TRPPR> Sending data: \033[0m');
      console.log(tripsList);
      res.json(tripsList);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  getTripsByEnd: function(req, res){
    var tripsList = [];
    var endLocation = req.body.endLocation; // || something else?

    Trip.findAll({
      where: {
        endLocation: {
          $iLike: endLocation
        }
      },
      attributes: ['id', 'driverName', 'tripDate', 'startLocation', 'endLocation',
        'numSeats', 'seatPrice', 'vehicleType', 'description']
    })
    .then(function(trips){
      for(var i = 0; i < trips.length; i++){
        tripsList.push(trips[i].dataValues);
      }
      console.log('\033[34m <TRPPR> Sending data: \033[0m');
      console.log(tripsList);
      res.json(tripsList);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  getTripsByDate: function(req, res){
    var tripsList = [];
    var tripDate = req.body.tripDate; // || something else?

    Trip.findAll({
      where: {
        tripDate: {
          $iLike: tripDate
        }
      },
      attributes: ['id', 'driverName', 'tripDate', 'startLocation', 'endLocation',
        'numSeats', 'seatPrice', 'vehicleType', 'description']
    })
    .then(function(trips){
      for(var i = 0; i < trips.length; i++){
        tripsList.push(trips[i].dataValues);
      }
      console.log('\033[34m <TRPPR> Sending data: \033[0m');
      console.log(tripsList);
      res.json(tripsList);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  searchTrips: function(req, res){
    var tripsList = [];

    // Grabs params from query, all of them are optional,
    // eg a blank query will return all trips
    var tripDate = req.query.tripDate;
    var startLocation = req.query.startLocation;
    var endLocation = req.query.endLocation;
    var numSeats = req.query.numSeats;
    var seatPrice = req.query.seatPrice;

    // Creating object that will store attribute queries. This
    // will create a query only if the attribute is passed in.
    var where = {};

    if(tripDate){
      where.tripDate = {
        // $iLike matches similar string, case-insensitve
        $iLike: tripDate
      }
    }
    if(startLocation){
      where.startLocation = {
        $iLike: startLocation
      }
    }
    if(endLocation){
      where.endLocation = {
        $iLike: endLocation
      }
    }
    if(numSeats){
      where.numSeats = {
        // $gte matches trips with at least as many seats as the query
        $gte: numSeats
      }
    }
    if(seatPrice){
      where.seatPrice = {
        // $lte matches trips that have prices less than or equal to the query's price
        $lte: seatPrice
      }
    }

    Trip.findAll({
      where,
      attributes: [
        'id',
        'driverName',
        'tripDate',
        'startLocation',
        'endLocation',
        'numSeats',
        'seatPrice',
        'vehicleType',
        'description',
        'driverId'
      ]
    })
    .then(function(trips){
      for(var i = 0; i < trips.length; i++){
        tripsList.push(trips[i].dataValues);
      }
      console.log(tripsList);
      res.json(tripsList);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  }

}
