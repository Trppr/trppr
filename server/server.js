var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Sequelize = require('sequelize');

// connecting to database should be moved out of server.js
var sequelize = new Sequelize('postgres://admin:PSZFZHAUDTKOUUHS@sl-us-dal-9-portal.2.dblayer.com:10860/trppr');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connected to database');
  }, function(err) {
    console.log('Unable to connect to the database:', err);
  });


var app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use('/', express.static('./client'));

app.listen(port, function() {
  console.log('Trppr server listening on port ', port);
});
