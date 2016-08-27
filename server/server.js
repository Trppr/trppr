const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./config/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/', routes);

app.listen(port, () =>{
  console.log('Trppr server listening on port ', port);
});
