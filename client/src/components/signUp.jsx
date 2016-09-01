import React, {Component} from 'react';
import {render} from 'react-dom';

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
      <form className="signUp">
        <h1>Create Your Account</h1>
        <div>
          <input
            value = {this.state.firstName}
            placeholder = 'Your First Name'
            onChange = {this.handleChange.bind(this, 'firstName')}/>
        </div>
        <div>
          <input
            value = {this.state.lastName}
            placeholder = 'Your Last Name'
            onChange = {this.handleChange.bind(this, 'lastName')}/>
        </div>
        <div>
          <input
            value = {this.state.description}
            placeholder = 'What trips interest you?'
            onChange = {this.handleChange.bind(this, 'description')}/>
        </div>
        <div>
          <input
            value = {this.state.email}
            placeholder = 'Your Email'
            onChange = {this.handleChange.bind(this, 'email')}/>
        </div>
        <div>
          <input
            value = {this.state.password}
            type = 'password'
            placeholder = 'Create Password'
            onChange = {this.handleChange.bind(this, 'password')}/>
        </div>
        {/* Trying to add a field that will confirm the new user's password */}
          <div>
          <input

            type = 'password'
            placeholder = 'Confirm password'
            //onChange = {this.handleChange.bind(this, ''''')}
          />
        </div>
        <div>
          <input
            type="button"
            value="Sign Up"
            onClick = {event => this.submitNewUser()}/>
        </div>
      </form>
    )
  }
}

export default Signup;
