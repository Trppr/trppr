const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = (app, express) => {
  app.use(cors());
  app.use(bodyParser.urlencoded());
  app.use('/', express.static('./client'));
};
