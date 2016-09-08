import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import axios from 'axios';

import CreateTrip from './createTrip.jsx';
import Signup from './signUp.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '',
                   password: '',
                   firstName: ''};
    this.submitUser = this.submitUser.bind(this);
  }

  checkUser(userObj) {
    const that = this;
    axios.post('/login',
      userObj
    )
    .then(function (response) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.firstName);
      localStorage.setItem('lastName', response.data.user.lastName);
      localStorage.setItem('id', response.data.user.id);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('description', response.data.user.description);
      localStorage.setItem('payToken', response.data.payToken);

      browserHistory.push('/app');
      console.log('Login successful!', response.data)
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


  submitUser(e) {
    e.preventDefault();
    this.checkUser(this.state);
  }

  render() {
    return (
      <div className = 'navbar-form navbar-right'>
          <form onSubmit={this.submitUser}>
              <input
                value = {this.state.email}
                type = 'email'
                required placeholder = 'E-mail address'
                className = 'form-control'
                id = 'emailAndPassword'
                onChange = {this.handleChange.bind(this, 'email')}/>

              <input
                value = {this.state.password}
                type = 'password'
                className = 'form-control'
                id = 'emailAndPassword'
                placeholder = 'Password'
                onChange = {this.handleChange.bind(this, 'password')}/>

              <input type = 'submit' value = 'Login' className='btn btn-default'/>
          </form>
      </div>
    )
  }
}

export default Login;
