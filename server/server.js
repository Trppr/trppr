const express = require('express');
const routes = require('./config/routes');
const Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

sequelize = new Sequelize('postgres://admin:PSZFZHAUDTKOUUHS@sl-us-dal-9-portal.2.dblayer.com:10860/compose');
sequelize
.authenticate()
.then(function(err) {
  console.log('Connected to DB!');
})
.catch(function (err) {
  console.log('Unable to connect to the database:', err);
});


require('./config/middleware.js')(app, express);
app.use('/', routes);

app.listen(port, () => {
  console.log('Trppr server listening on port ', port);
});
