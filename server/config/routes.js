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
    //gives user acess to account
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
