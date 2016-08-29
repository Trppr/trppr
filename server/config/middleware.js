const cors = require('cors');
const bodyParser = require('body-parser');
// const expressJWT = require('express-jwt');


module.exports = (app, express) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  //hide secret later also needs to be hidden from login route
  //path array lets you use those paths with out jwt
  //you need to add Authorization and Bearer [jwt] in your header to use all other routes
  //app.use(expressJWT({secret:'hello world trppr'})
  //.unless({path: ['/login', '/', '/recent', '/signup', '/search', '/dummyData']}));

  app.use('/', express.static('./client'));
};
