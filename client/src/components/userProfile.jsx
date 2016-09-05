import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import NavBar from './navBar.jsx';
import UserTrips from './userTrips.jsx';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {createdTrips: [],
                  joinedTrips: [] };
    this.getTrips = this.getTrips.bind(this);
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

  componentWillMount() {
    this.getTrips();
  }
  
  render() {
    return (
      <div className = 'container'>
        <h1>Created trips</h1>
        <NavBar />
        <UserTrips trips={this.state.createdTrips}/>
      </div>
    )
  }
}

export default UserProfile;
