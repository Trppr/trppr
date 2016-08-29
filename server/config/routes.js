// const jwt = require('jsonwebtoken');

module.exports = (app, express) => {

  app.get('/dummyData', (req, res) => {
    res.status(200)
    .body({
      hello: 'world'
    });
  });

  app.get('/recent', (req, res) => {
    //gets most recent trips
  });

  app.post('/signup', (req, res) => {
    //create new user
  });

  app.post('/login', (req, res) => {
    //checks to make sure we got both a username and password on the request
    //in Postman use body and x-www-form-urlencoded to enter username and password
    if(!req.body.username){
      res.status(400).send('username required');
      return;
    }
    if(!req.body.password){
      res.status(400).send('password required');
      return;
    }
    //test login with JWTs
    if(req.body.username === 'john' && req.body.password === '123'){
      const myToken = jwt
      .sign({ username: req.body.username }, 'hello world trppr');
      res.status(200).json(myToken);
    }else {
      res.status(401).send('invalid login');
    }
  });

  app.get('/search', (req, res) => {
    //uses search params to get revelent results
  });

  app.post('/createTrip', (req, res) => {
    //creates a new trip
  });

  app.post('/reserve', (req, res) => {
    //reserves seat or seats on a trip
  });

  app.get('*', (req, res) => {
    res.status(404);
  });

};
