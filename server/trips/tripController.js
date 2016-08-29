
const Trip = require('../trips/tripModel');

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
        console.log("<TRPPR> new trip created");
        // send response?
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
      console.log("<TRPPR> seat reserved");
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  },

  getAllTrips: function(req, res){
    var tripsList = [];
    Trip.findAll({
      attributes: ['id', 'driverName', 'tripDate', 'startLocation', 'endLocation']
    })
    .then(function(trips){
      for(var i = 0; i < trips.length; i++){
        tripsList.push(trips[i].dataValues);
      }
      console.log(tripsList);
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
      console.log(tripsList);
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
      console.log(tripsList);
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
      console.log(tripsList);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  }

}
