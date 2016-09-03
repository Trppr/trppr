import React, {Component} from 'react';
import {render} from 'react-dom';

import NavBar from './navBar.jsx'
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '',
                   lastName: '',
                   password: '',
                   email: '',
                   description: ''
    };
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitNewUser() {
    this.props.createUser(this.state);
    //console.log("new User Object:", this.state);
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <form className="signUp form-group">
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
          {/* Trying to add a field that will confirm the new user's password */}
            <div>
            <input

              type = 'password'
              placeholder = 'Confirm password'
              className="form-control"
              //onChange = {this.handleChange.bind(this, ''''')}
            />
          </div>
          <div>
            <input
              type="button"
              value="Sign Up"
              className="btn btn-primary"
              onClick = {event => this.submitNewUser()}/>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup;
