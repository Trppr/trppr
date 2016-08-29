<<<<<<< 74d4523cc5c93c8ce7a4acb809357ae6fa6b14df
const jwt = require('jsonwebtoken');
const tripController = require('../trips/tripController');
=======
// const jwt = require('jsonwebtoken');
>>>>>>> [feature] Simple ajax request added, waiting on dummy data

module.exports = (app, express) => {

  app.get('/dummyData', (req, res) => {
    res.status(200)
    .send({
      hello: 'world'
    });
  });

  app.get('/recent', (req, res) => {
    //gets most recent trips
  });

  app.post('/signup', (req, res) => {
    //create new user
  });

  app.post('/login', (req, res) => {
    //checks to make sure we got both a username and password on the request
    //in Postman use body and x-www-form-urlencoded to enter username and password
    if(!req.body.username){
      res.status(400).send('username required');
      return;
    }
    if(!req.body.password){
      res.status(400).send('password required');
      return;
    }
    //test login with JWTs
    if(req.body.username === 'john' && req.body.password === '123'){
      const myToken = jwt
      .sign({ username: req.body.username }, 'hello world trppr');
      res.status(200).json(myToken);
    }else {
      res.status(401).send('invalid login');
    }
  });

  /*
  *  Trip API Requests
  */

  app.get('/getAllTrips', tripController.getAllTrips);
  // Grabs all the trips, needs no params.

  app.post('/getTripsByStart', tripController.getTripsByStart);
  // Needs start location -> req.body.startLocation

  app.post('/getTripsByEnd', tripController.getTripsByEnd);
  // Needs end location -> req.body.endLocation

  app.post('/getTripsByDate', tripController.getTripsByDate);
  // Needs a date -> req.body.tripDate

  app.post('/createTrip', tripController.createTrip);
  // Needs ALL the trip model attributes, refer to tripController.js or schema
  // Note: The driverId field has to be a valid user id.

  app.post('/reserveSeat', tripController.reserveSeat);
  // Needs trip id & passenger id -> req.body.tripId, req.body.passengerId
  // Note: These id's are foreign keys so they have to exist in the db
  // for this to work.

  app.get('*', (req, res) => {
    res.status(404);
  });

};
