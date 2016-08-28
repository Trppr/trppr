const cors = require('cors');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

module.exports = (app, express) => {
  app.use(cors());
  app.use(bodyParser.urlencoded());
  //hide secret later
  app.use(expressJWT({secret:'hello world trppr'})
  .unless({path: ['/login', '/', '/recent', '/signup', '/search', '/dummyData']}));

  app.use('/', express.static('./client'));
};
