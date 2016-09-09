import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {render} from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import {browserHistory} from 'react-router';

import TripList from './src/components/tripList.jsx';
import SearchBar from './src/components/searchBar.jsx';
import NavBar from './src/components/navBar.jsx';
import CreateTrip from './src/components/createTrip.jsx';
import Directions from './src/components/tripMap.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '',
                   tripResults: [],
                   Authorization: '',
                   landingLocation: '',
                   isLoading: ''
                 };
    this.infoStore = this.infoStore.bind(this);
  }

  infoStore(searchObj) {
    this.setState({searchTerm: searchObj});
    this.getTrips(searchObj);
  }

  getTrips(searchObj) {
    const that = this;
    that.setState({isLoading: true});
    if(searchObj.startDate && searchObj.startDate !== '')
      searchObj.startDate = moment(searchObj.startDate).format('MM-DD-YYYY');
    if(searchObj.endDate && searchObj.endDate !== '')
      searchObj.endDate = moment(searchObj.endDate).format('MM-DD-YYYY');
    axios.get('/searchTrips', {
      params: searchObj
      }
    )
    .then(function (response) {
      const filtered = [];
      for(const trip of response.data) {
        if(trip.numSeats > 0) {
          filtered.push(trip);
        }
      }
      that.setState({tripResults: filtered,
                    isLoading: false
                  });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  reserveSeat(reserveObj) {
    if(localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    axios.post('/reserveSeat',
      reserveObj
    )
    .then(function (response) {
      console.log('Seat reserved!', response.data)
      browserHistory.push('/userProfile')
    })
    .catch(function (error) {
      console.log(error);
    })
  }

componentWillMount() {
    if(this.props.params.location) {
      this.state.landingLocation = this.props.params.location;
      this.getTrips({endLocation: this.state.landingLocation})
      this.props.params.location = undefined;
      this.state.landingLocation = ''
    }
}

  render () {
    if (this.state.isLoading) {
      return (
        <div>
          <NavBar />
          <div className="container">
            <h1>Detailed Search</h1>
            <SearchBar infoStore={this.infoStore}/>
           </div>
          <img src={'../car.gif'} className="spinner"/>
        </div>
      )
    }
    else {
      return (
        <div>
          <NavBar />
          <div className="container">
            <h1>Detailed Search</h1>
            <SearchBar infoStore={this.infoStore}/>
          </div>
          <TripList reserveSeat={this.reserveSeat} trips={this.state.tripResults}/>
        </div>
      )
    }
  }
}

export default App;
