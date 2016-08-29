const Trip = require('../trips/tripModel');

module.exports = {

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
