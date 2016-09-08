const Sequelize = require('sequelize');

//Need to add a database that is mysql/postgres/sql compatible
//here for the db to work
var sequelize = new Sequelize('postgres://admin:AFCMBPNBKVXSYIDO@aws-us-east-1-portal.13.dblayer.com:15254/compose');

sequelize
.authenticate()
.then(function(err) {
  console.log('\033[34m <TRPPR> Connected to DB. \033[0m');

})
.catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

module.exports = sequelize;
