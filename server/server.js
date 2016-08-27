const express = require('express');
const routes = require('./config/routes');

const app = express();
const port = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);
app.use('/', routes);

app.listen(port, () => {
  console.log('Trppr server listening on port ', port);
});
