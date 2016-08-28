const Sequelize = require('sequelize');

sequelize = new Sequelize('postgres://admin:PSZFZHAUDTKOUUHS@sl-us-dal-9-portal.2.dblayer.com:10860/trppr');

sequelize
.authenticate()
.then(function(err) {
  console.log('Connected to DB!');
})
.catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

module.exports = sequelize;
