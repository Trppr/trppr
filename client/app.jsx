//if you require outside files at the top of the entry file defined when you
//call webpack in the terminal, webpack automatically bundles the linked files
import React, { Component } from 'react';
import {render} from 'react-dom';
const axios = require('axios');
const moment = require('moment');

import TripList from './src/components/tripList.jsx';
import SearchBar from './src/components/searchBar.jsx';
import CreateTrip from './src/components/createTrip.jsx';
import Login from './src/components/login.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '',
                   tripResults: [],
                   Authorization: ''
                 };
    this.infoStore = this.infoStore.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  infoStore(searchObj) {
    this.setState({searchTerm: searchObj});
    this.getTrips(searchObj);
  }

  getTrips(searchObj) {
    const that = this;
    if(searchObj.startDate !== '')
      searchObj.startDate = moment(searchObj.startDate).format('MM-DD-YYYY');
    if(searchObj.endDate !== '')
      searchObj.endDate = moment(searchObj.endDate).format('MM-DD-YYYY');
    console.log('searchObj inside app.jsx', searchObj)
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
      render(<div> Please login. </div>, document.getElementById('create'));
      console.log(error);
    });
  }

  checkUser(userObj) {
    const that = this;
    axios.post('/login',
      userObj
    )
    .then(function (response) {
      console.log('response inside checkUser app.jsx: ',response);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data;
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

            <div className="container">
              <ul className="nav nav-tabs">
                <li role="presentation" className="active">
                  <a href="#">Search Trips</a>
                </li>
                <li role="presentation">
                  <a href="#">Create Trip</a>
                </li>
              </ul>
              <SearchBar infoStore={this.infoStore}/>
              <CreateTrip makeTrip={this.makeTrip}/>
            </div>

            <TripList trips={this.state.tripResults}/>
          </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

// document.getElementById('root').appendChild(tripList());
// document.getElementById('root').appendChild(apple());
// document.getElementById('root').appendChild(trip());
