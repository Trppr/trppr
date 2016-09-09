const jwt = require('jsonwebtoken');
const path = require('path');
const tripController = require('../trips/tripController');
const userController = require('../users/userController');
const request = require('request');
const querystring = require('querystring');

const braintree = require('braintree');


var gateway = braintree.connect({
  accessToken: 'access_token$sandbox$vf5pkqztz5zw3nd6$4676b0609a3a65e34c93ec60d58a5adb'
});



module.exports = (app, express) => {

  /*
  *  User API Requests
  */

  app.post('/signup', userController.createUser);
  // Takes the following(description not required):
  // req.body.email,
  // req.body.password,
  // req.body.firstName,
  // req.body.lastName,
  // req.body.description
  // Succes -> 201
  // Failure -> 500 with errors

  app.post('/login', userController.authenticateUser);
  // Takes the following:
  // req.body.email,
  // req.body.password
  // Success -> Will return json object with user object and token
  // Failure -> 500 with erors

  app.post('/updateUser', userController.updateUser);
  app.post('/getDriverHistory', userController.getDriverHistory);
  app.post('/getPassengerHistory', userController.getPassengerHistory);

  /*
  *  Trip API Requests
  */

  app.get('/searchTrips', tripController.searchTrips);
  // Trip search performed via get request, all params are
  // optional. If all params are blank, all trips will be
  // returned. This request takes the following query params:
  // startDate & endDate: Date format MM/DD, MM/DD/YYYY
  // startLocation & endLocation: Can be city name or state
  // numSeats & seatPrice: Must be integers.
  // Note: Check tripController.js for more details. Example:
  // searchTrips?startLocation=los+angeles&startDate=9/15&numSeats=2

  app.post('/createTrip', tripController.createTrip);
  // Needs ALL the trip model attributes, refer to tripController.js or schema
  // Note: The driverId field has to be a valid user id.

  app.post('/reserveSeat', tripController.reserveSeat);
  // Needs trip id & passenger id -> req.body.tripId, req.body.passengerId
  // Note: These id's are foreign keys so they have to exist in the db
  // for this to work.

  app.post('/cancelTrip', tripController.cancelTrip);
  // deletes tripId via req.body.tripId

  app.post('/cancelReservation', tripController.cancelReservation);
  // deletes reservation via req.body.passengerId & req.body.tripId

  app.post("/checkout", function (req, res) {
    console.log(req.body);
  gateway.transaction.sale({
    amount: req.body.amount,
    paymentMethodNonce: req.body.nonce,
    options: {
      submitForSettlement: true
    }
    }, function (err, result) {
      if(err){
        res.send(err);
      }
      res.send(result);
    });

  });


  // app.post("/paydiver", function(amount, driverId){

  //        var options={url:'https://api.sandbox.paypal.com/v1/oauth2/token',
  //         method:'POST',
  //          body:'grant_type=client_credentials',
  //         headers:{
  //           'Accept':'application/json',
  //           'Accept-Language': 'en_US',
  //           'Authorization':"Basic AcvVvZYgpbzTsRXPl1dnLUh1GKgx4MKWwPSGpSWLB3MgXY2tdESQ5D6McLdIqwzS4CyR_jxy2v8XBHpe:EPTf0rmJDd1JIJ3aNbKTZXuSXkCSD7Y2S8B5OUPqtFDi93wOq_ClgigGrICR8YvLpgGkStnTTrc_KLqz"
  //         }};

  //        request(options, function(error, response, body){
  //           console.log("request made");
  //           console.log(body);
  //           res.send(body);

  //         });

  // });

  app.post('/paydriver', function(req,res){

      var qs='grant_type=client_credentials';

      var options={
        url:'https://api.sandbox.paypal.com/v1/oauth2/token',
        method:'POST',
        body: qs,
        "headers": {
        "authorization": "Basic QWN2VnZaWWdwYnpUc1JYUGwxZG5MVWgxR0tneDRNS1d3UFNHcFNXTEIzTWdYWTJ0ZEVTUTVENk1jTGRJcXd6UzRDeVJfanh5MnY4WEJIcGU6RVBUZjBybUpEZDFKSUozYU5iS1RaWHVTWGtDU0Q3WTJTOEI1T1VQcXRGRGk5M3dPcV9DbGdpZ0dySUNSOFl2THBnR2tTdG5UVHJjX0tMcXo=",
        "cache-control": "no-cache",
        //"postman-token": "d28c570e-44a0-9d35-08f8-f83eb4cdd158",
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json"
      }
      };


      request(options, function(error, response, body){
        console.log("request made");
        // console.log(body);
        var accessToken=JSON.parse(body).access_token;
        //res.send(JSON.parse(body));

        var options = { method: 'POST',
          url: 'https://api.sandbox.paypal.com/v1/payments/payouts',
          headers: 
           { 'postman-token': '9899a1cc-d03b-571d-3fb4-3f353d436a37',
             'cache-control': 'no-cache',
             'content-type': 'application/json',
             authorization: 'Bearer '+accessToken },
          body: 
           { sender_batch_header: { email_subject: 'You have a payment' },
             items: 
              [ { recipient_type: 'EMAIL',
                  amount: { value: 12.34, currency: 'USD' },
                  receiver: 'lsfisher-buyer2@usc.edu',
                  note: 'Payment for recent T-Shirt delivery',
                  sender_item_id: 'A123' } ] },
          json: true };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
          res.send(body);
        });

      });

  });



  // handle every other route with index.html, which will contain
  // a script tag to your application's JavaScript file(s).
  app.get('*', function (request, response){
    response.sendFile(path.resolve('./', 'client', 'index.html'));
  });

  app.get('*', (req, res) => {
    res.sendStatus(404);
  });

};
