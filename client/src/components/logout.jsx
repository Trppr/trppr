import React, {Component} from 'react';
import {render} from 'react-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  unAuth() {
    localStorage.removeItem('token');
  }
  render() {
    return (
      <button onClick = {this.unAuth}> Logout </button>
    );
  }
}

export default Logout;
