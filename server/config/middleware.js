const cors = require('cors');

module.exports = function(app, express) {
  app.use(cors());
  app.use('/', express.static('./client'));
};
