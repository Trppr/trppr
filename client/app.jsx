//if you require outside files at the top of the entry file defined when you
//call webpack in the terminal, webpack automatically bundles the linked files
import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {render} from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import TripList from './src/components/tripList.jsx';
import SearchBar from './src/components/searchBar.jsx';
import NavBar from './src/components/navBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '',
                   tripResults: [],
                   Authorization: '',
                   landingLocation: ''
                 };
    this.infoStore = this.infoStore.bind(this);
  }

  infoStore(searchObj) {
    this.setState({searchTerm: searchObj});
    this.getTrips(searchObj);
  }

  getTrips(searchObj) {
    const that = this;
    if(searchObj.startDate && searchObj.startDate !== '')
      searchObj.startDate = moment(searchObj.startDate).format('MM-DD-YYYY');
    if(searchObj.endDate && searchObj.endDate !== '')
      searchObj.endDate = moment(searchObj.endDate).format('MM-DD-YYYY');
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

  reserveSeat(reserveObj) {
    //need tripId and seatNum
    axios.post('/reserveSeat',
      reserveObj
    )
    .then(function (response) {
      console.log('Seat reserved!', response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  render () {
    if(this.props.params.location) {
      this.state.landingLocation = this.props.params.location;
      this.getTrips({endLocation: this.state.landingLocation})
      this.props.params.location = undefined;
      this.state.landingLocation = ''
    }
    return (
          <div>
          <NavBar checkUser={this.checkUser}/>
           <div className="container">
             <h1>Detailed Search</h1>
             <SearchBar infoStore={this.infoStore}/>
           </div>
            <TripList reserveSeat={this.reserveSeat} trips={this.state.tripResults}/>
          </div>
    )
  }
}

export default App;
