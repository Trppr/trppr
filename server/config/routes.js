const express = require('express');
const router = express.Router();

router.use('/', express.static('./client'));

router.get('/dummyData', (req, res)=>{
  res.send(200, {hello:'world'});
});

router.get('/recent', (req, res)=>{
  //gets most recent trips
});

router.post('/signup', (req, res)=>{
  //create new user
});

router.post('/login', (req, res)=>{
  //gives user acess to account
});

router.get('/search', (req, res)=>{
  //uses search params to get revelent results
});

router.post('/createTrip', (req, res)=>{
  //creates a new trip
});

router.post('/reserve', (req, res)=>{
  //reserves seat or seats on a trip
});

router.get('*', (req, res)=>{
  res.send(404);
});

module.exports = router;
