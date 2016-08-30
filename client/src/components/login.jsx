import React, {Component} from 'react';
import {render} from 'react-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '',
                   password: ''};
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitUser() {
    this.props.checkUser(this.state);
  }

  render() {
    return (
      <form>
        <div>
          <input
            value = {this.state.username}
            placeholder = 'Username'
            onChange = {this.handleChange.bind(this, 'username')}/>
        </div>
        <div>
          <input
            value = {this.state.password}
            type = 'password'
            placeholder = 'Password'
            onChange = {this.handleChange.bind(this, 'password')}/>
        </div>
        <div>
          <input
            type="button"
            value="Login"
            onClick = {event => this.submitUser()}/>
        </div>
      </form>
    )
  }
}

export default Login;
