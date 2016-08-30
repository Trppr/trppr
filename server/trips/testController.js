const Trip = require('../trips/tripModel');
module.exports = {
  search: function(req, res){
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
      console.log(req);


      tripsList = tripsList.filter((trip) => {
        if(req.body.endLocation) if(req.body.endLocation !== trip.endLocation) return false;
        if(req.body.startLocation) if(req.body.startLocation !== trip.startLocation) return false;
        if(req.body.numSeats)if(req.body.numSeats > trip.numSeats) return false;
        if(req.body.price)if(req.body.price < trip.price) return false;
        return true;
      })

      console.log(tripsList);

      res.json(tripsList);
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
  }
}

// { endLocation: '',
//   startLocation: '',
//   numSeats: '',
//   price: ''
//  };
