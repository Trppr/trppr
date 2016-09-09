const cors = require('cors');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const morgan = require('morgan');

module.exports = (app, express) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use('/', express.static('./client'));
  app.use(morgan('dev'));

};
