//if you require outside files at the top of the entry file defined when you
//call webpack in the terminal, webpack automatically bundles the linked files
import React, { Component } from 'react';
import {render} from 'react-dom';
const axios = require('axios');

var trip = require('./src/components/trip.jsx');
import TripList from './src/components/tripList.jsx';
import SearchBar from './src/components/searchBar.jsx';
import CreateTrip from './src/components/createTrip.jsx'
import Login from './src/components/login.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '',
                   tripResults: []
                 };
    this.infoStore = this.infoStore.bind(this);
  }

  infoStore(searchObj) {
    this.setState({searchTerm: searchObj});
    this.getTrips(searchObj);
  }

  getTrips(searchObj) {
    const that = this;
    axios.get('/searchTrips', {
      params: searchObj
      }
    )
    .then(function (response) {
      that.setState({tripResults: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  makeTrip(tripObj) {
    const that = this;
    axios.post('/createTrip',
      tripObj
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  checkUser(userObj) {
    console.log('userObj inside app.jsx', userObj)
    axios.post('/login',
      userObj
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render () {
    console.log('state inside app.jsx', this.state)
    return (
          <div>
            <Login checkUser={this.checkUser}/>
            <SearchBar infoStore={this.infoStore}/>
            <TripList trips={this.state.tripResults}/>
            <CreateTrip makeTrip={this.makeTrip}/>
          </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

// document.getElementById('root').appendChild(tripList());
// document.getElementById('root').appendChild(apple());
// document.getElementById('root').appendChild(trip());
