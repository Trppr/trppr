const express = require('express');
//const routes = require('./config/routes');

const app = express();
const port = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);
require('./config/routes')(app, express);

app.listen(port, () => {
  console.log('Trppr server listening on port ', port);
});
