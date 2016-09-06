import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import NavBar from './navBar.jsx';
import UserTrips from './userTrips.jsx';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {createdTrips: [],
                  joinedTrips: [],
                  name: localStorage.getItem('name'),
                  lastName: localStorage.getItem('lastName'),
                  description: localStorage.getItem('description'),
                  email: localStorage.getItem('email') };
    this.getTrips = this.getTrips.bind(this);
    this.checkFilled = this.checkFilled.bind(this);
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

  updateUser(userObj) {
    console.log(userObj, 'inside updateUser')
    axios.post('/updateUser',
      userObj
    )
    .then(function(response) {
      console.log("user updated ", response);
      localStorage.setItem('name', response.data.user.firstName);
      localStorage.setItem('lastName', response.data.user.lastName);
      localStorage.setItem('id', response.data.user.id);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('description', response.data.user.description);
      browserHistory.push('/userProfile');
    })
    .catch(function(error) {
      render(<div id="emailError"> User email already exists. Please enter a different email address. </div>, document.getElementById('create'));
      console.log(error);
    })
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  checkFilled(e) {
    e.preventDefault();
    let filled = true;
    const userObj = { name: this.state.name,
                lastName: this.state.lastName,
                description: this.state.description,
                email: this.state.email }
    for(var attr in userObj) {
      if(this.state[attr] === '') {
        filled = false;
      }
    }
    if(!filled) {
      render(<div> Please fill out all empty fields </div>, document.getElementById('create'));
    } else {
      if(this.state.password !== this.state.confirm) {
        render(<div> Passwords do not match </div>, document.getElementById('create'));
      } else {
        render(<div></div>, document.getElementById('create'));
        console.log('userObj inside userProfile', userObj)
        this.updateUser(userObj);
      }
    }
  }

  render() {
    return (
      <div className = 'container'>
        <h1>User info</h1>
        <form className="signUp form-group" onSubmit={this.checkFilled}>
          <h1>Update info</h1>
          <div>
            <input
              value = {this.state.name}
              placeholder = 'Your First Name'
              className="form-control"
              onChange = {this.handleChange.bind(this, 'firstName')}/>
          </div>
          <div>
            <input
              value = {this.state.lastName}
              placeholder = 'Your Last Name'
              className="form-control"
              onChange = {this.handleChange.bind(this, 'lastName')}/>
          </div>
          <div>
            <input
              value = {this.state.description}
              placeholder = 'What trips interest you?'
              className="form-control"
              onChange = {this.handleChange.bind(this, 'description')}/>
          </div>
          <div>
            <input
              type = 'email'
              value = {this.state.email}
              placeholder = 'Your Email'
              className="form-control"
              onChange = {this.handleChange.bind(this, 'email')}/>
          </div>
          <div>
            <input
              type="submit"
              value="Update"
              className="btn btn-primary"/>
          </div>
        </form>
        <h1>Created trips</h1>
        <NavBar />
        <UserTrips trips={this.state.createdTrips}/>
      </div>
    )
  }
}

export default UserProfile;
