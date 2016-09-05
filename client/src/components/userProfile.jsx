import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import NavBar from './navBar.jsx'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTrips() {
    axios.post('/getDriverHistory',
      {driverId: localStorage.getItem('id')}
    )
    .then(function(response) {
      console.log('inside userProfile.jsx', response);
    })
    .catch(function(error) {
      // render(<div> {error} </div>, document.getElementById('create'));
      render(<div> User email already exists. Please enter a different email address. </div>, document.getElementById('create'));
      console.log(error);
    })
  }

  render() {
    return (
      <div className = 'container'>
        <NavBar />
        <input
          type="button"
          className="btn btn-primary"
          value="Create"
          onClick = {event => this.getTrips()}/>
      </div>
    )
  }
}

export default UserProfile;
