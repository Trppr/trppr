const api_key = "key-62e8d3172f916134ea9b42bc938309ad";
const domain = 'sandbox4013da47551941d09a392674d9bc31b0.mailgun.org';
const mailgun = require("mailgun-js")({apiKey:api_key,domain:domain});
const User = require('../users/userModel');

module.exports = {
   sendMail: function(user_id) {
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
          text: 'This email is to confirm ' + user.get('firstName') + ' ' + user.get('lastName') + 'has successfully booked a trip using Trippr. Thank you for using our service!'
        };

        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });

      }).catch(function(err){
        console.log('there is an error');
      })
  }
}
