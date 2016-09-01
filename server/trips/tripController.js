const Trip = require('../trips/tripModel');
const sequelize = require('sequelize');
const moment = require('moment');


module.exports = {
  createTrip: function(req, res){
    const newTrip = Trip.build({
      driverName: req.body.driverName,
      tripDate: req.body.tripDate,
      startSt: req.body.startSt,
      startCity: req.body.startCity,
      startState: req.body.startState,
      endSt: req.body.endSt,
      endCity: req.body.endCity,
      endState: req.body.endState,
      numSeats: req.body.numSeats,
      seatPrice: req.body.seatPrice,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vehicleYear: req.body.vehicleYear,
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
      trip.addPassengers(req.body.passengerId);
      console.log("\033[34m <TRPPR> Seat reserved. \033[0m");
      res.sendStatus(201);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  searchTrips: function(req, res){
    var tripsList = [];

    // The code below handles converting dates from params to PostgreSQL style.
    // This is to make requests more robust and to limit errors while comparing
    // dates. If both dates are entered, the query will look for dates inbetween
    // that range. If only startDate is entered, trips dates after will be returned.
    // If only endDate, trips before and up to endDate will be returned.
    // Allowed formats: MM/DD/YYYY or MM-DD-YYYY. No leading zeros required, the year
    // can be two or four digits or ommitted entirely.
    var startDate, endDate, momentObj;
    if(req.query.startDate){
      momentObj = moment(req.query.startDate, "MM-DD-YYYY");
      startDate = momentObj.format('YYYY-MM-DD HH:mm:ss Z');
      if(!req.query.endDate){
        endDate = momentObj.add(1, 'months').format('YYYY-MM-DD HH:mm:ss Z');
      }
    }

    if(req.query.endDate){
      momentObj = moment(req.query.endDate, "MM-DD-YYYY");
      endDate = momentObj.add(24, 'hours').format('YYYY-MM-DD HH:mm:ss Z');
      if(!req.query.startDate){
        startDate = momentObj.subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss Z');
      }
    }
    // Location can be either state or city. numSeats and seatPrice should be ints.
    var startLocation = req.query.startLocation;
    var endLocation = req.query.endLocation;
    var numSeats = req.query.numSeats;
    var seatPrice = req.query.seatPrice;

    // Creating an object to store attribute queries. This
    // will create a query only if the attribute is passed in.
    var where = {};

    // The two if() statements below check if the start/end location contain
    // either the city or state.
    if(startLocation){
      where = {
        $or: [
          { startCity: { $iLike: startLocation } },
          { startState: { $iLike: startLocation } }
        ]
      }
    }
    if(endLocation){
      where = {
        $or: [
          { endCity: { $iLike: endLocation } },
          { endState: { $iLike: endLocation } }
        ]
      }
    }

    // The following if()s add additional queries to the query object.
    if(startDate){
      where.tripDate = { $gte: startDate, $lte: endDate }
      // matches a departure date between the start and end date
    }
    if(numSeats){
      where.numSeats = { $gte: numSeats }
      // $gte matches trips with at least as many seats as the query
    }
    if(seatPrice){
      where.seatPrice = { $lte: seatPrice }
      // $lte matches trips that have prices less than or equal to the query's price
    }

    Trip.findAll({
      where,
      attributes: [
        'id',
        'driverName',
        'driverId',
        'tripDate',
        'startSt',
        'startCity',
        'startState',
        'endSt',
        'endCity',
        'endState',
        'numSeats',
        'seatPrice',
        'vehicleMake',
        'vehicleModel',
        'vehicleYear',
        'description'
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
      console.log('Error:', err.message);
      res.send(err.message);
    });
  }

}
