import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

import axios from 'axios';
import NavBar from './navBar.jsx'


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '',
                   lastName: '',
                   password: '',
                   email: '',
                   description: '',
                   confirm: ''
    };
    this.checkFilled = this.checkFilled.bind(this);
  }

  createUser(newUserObj) {
    const that = this;
    axios.post('/signup',
      newUserObj
    )
    .then(function(response) {
      console.log("new user created: ", response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.firstName);
      localStorage.setItem('id', response.data.user.id);
      browserHistory.push('/app');
    })
    .catch(function(error) {
      // render(<div> {error} </div>, document.getElementById('create'));
      render(<div> User email already exists. Please enter a different email address. </div>, document.getElementById('create'));
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
    for(var attr in this.state) {
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
        this.createUser(this.state);
      }
    }
  }


  submitNewUser() {
    this.props.createUser(this.state);
    //console.log("new User Object:", this.state);
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <form className="signUp form-group" onSubmit={this.checkFilled}>
          <h1>Create Your Account</h1>
          <div>
            <input
              value = {this.state.firstName}
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
              value = {this.state.password}
              type = 'password'
              placeholder = 'Create Password'
              className="form-control"
              onChange = {this.handleChange.bind(this, 'password')}/>
          </div>
          <div>
            <input
              value = {this.state.confirm}
              type = 'password'
              placeholder = 'Confirm password'
              className="form-control"
              onChange = {this.handleChange.bind(this, 'confirm')}/>
          </div>
          <div>
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-primary"/>
          </div>
        </form>
      </div>

    )
  }
}

export default Signup;
