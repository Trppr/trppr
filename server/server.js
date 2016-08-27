var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use('/', express.static('./client'));

app.listen(port, function(){
  console.log('Trppr server listening on port ', port);
});
