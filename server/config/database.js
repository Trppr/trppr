const Sequelize = require('sequelize');

var sequelize = new Sequelize('trppr', 'admin', 'PSZFZHAUDTKOUUHS', {
  host: 'sl-us-dal-9-portal.2.dblayer.com',
  dialect: 'postgres',
  port: '10860',
  logging: false,
});

sequelize
.authenticate()
.then(function(err) {
  console.log('\033[34m <TRPPR> Connected to DB. \033[0m');

})
.catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

module.exports = sequelize;
