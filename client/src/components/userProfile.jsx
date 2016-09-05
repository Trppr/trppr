import React, {Component} from 'react';
import {render} from 'react-dom';

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
      console.log("new user created: ", response);
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
        <input onClick={getTrips} value='Test'/>
      </div>
    )
  }
}

export default UserProfile;
