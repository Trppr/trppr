import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import NavBar from './navBar.jsx';
import TripList from './tripList.jsx';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {createdTrips: [],
                  joinedTrips: [] };
    this.getTrips = this.getTrips.bind(this);
    this.reserveSeat = this.reserveSeat.bind(this);
  }

  getTrips() {
    const that = this;
    axios.post('/getDriverHistory',
      {driverId: localStorage.getItem('id')}
    )
    .then(function(response) {
      that.setState({createdTrips: response.data})
      console.log('inside userProfile.jsx', response);
    })
    .catch(function(error) {
      console.log(error);
    })

    axios.post('/getPassengerHistory',
      {driverId: localStorage.getItem('id')}
    )
    .then(function(response) {
      // that.setState({createdTrips: response.data})
      console.log('inside userProfile.jsx /getPassengerHistory' , response);
    })
    .catch(function(error) {
      console.log(error);
    })
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
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentWillMount() {
    this.getTrips();
  }
  render() {
    return (
      <div className = 'container'>
        <h1>Created trips</h1>
        <NavBar />
        <TripList reserveSeat={this.reserveSeat} trips={this.state.createdTrips}/>
      </div>
    )
  }
}

export default UserProfile;
