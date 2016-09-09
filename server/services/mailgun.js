const api_key = "key-62e8d3172f916134ea9b42bc938309ad";
const domain = 'sandbox4013da47551941d09a392674d9bc31b0.mailgun.org';
const mailgun = require("mailgun-js")({apiKey:api_key,domain:domain});
const User = require('../users/userModel');

module.exports = {
   confirmPassengerTrip: function(user_id) {
      User.findOne({
        where: {
          id: user_id
        }
      }).then(function(user){
        var userEmail = user.get('email');
        console.log("This is an email", user.get('email'));
        var data = {
          from: 'Trpper <postmaster@sandbox4013da47551941d09a392674d9bc31b0.mailgun.org>',
          to: userEmail,
          subject: 'Hello' + user.get('firstName'),
          text: 'This email is to confirm ' + user.get('firstName') + ' ' + user.get('lastName') + ' ' + 'has successfully booked a trip using Trippr. Thank you for using our service!'
        };

        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });

      }).catch(function(err){
        console.log('there is an error');
      })
  },

  mailDriver: function(driver_name){
    User.findOne({
      where: {
        firstName : driver_name
      }
    }).then(function(user){
      var userEmail = user.get('email');
      console.log('+++line 37: THIS SHOULD BE THE USER: ', user.get('firstName'));
      var data = {
        from: 'Trpper <postmaster@sandbox4013da47551941d09a392674d9bc31b0.mailgun.org>',
        to: userEmail,
        subject: 'Hello' + user.get('firstName'),
        text: 'This email is to confirm that you, ' + user.get('firstName') + ' ' + user.get('lastName') + ', have a seat reserved for your trip. Thank you for using our service!'
      };

      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
    }).catch(function(err){
      console.log('+++line49 MAILGUNDRIVER: there is an error');
    })
  }

}
