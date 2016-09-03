import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import axios from 'axios';

import CreateTrip from './createTrip.jsx';
import Signup from './signUp.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '',
                   password: ''};
  }

  checkUser(userObj) {
    const that = this;
    axios.post('/login',
      userObj
    )
    .then(function (response) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data;
      console.log('Login successful!')
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitUser() {
    // console.log("newuserobject:", this.state);
    this.checkUser(this.state);
  }

  render() {
    return (
      <div>
        <input
          value = {this.state.email}
          type = 'email'
          required placeholder = 'E-mail address'
          className = 'form-control'
          onChange = {this.handleChange.bind(this, 'email')}/>

        <input
          value = {this.state.password}
          type = 'password'
          className = 'form-control'
          placeholder = 'Password'
          onChange = {this.handleChange.bind(this, 'password')}/>

        <input
          type = 'button'
          className = 'btn btn-primary'
          value = 'Login'
          onClick = {event => this.submitUser()}/>
      </div>
    )
  }
}

export default Login;
