import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  unAuth() {
    localStorage.removeItem('token');
    browserHistory.push('/app');
  }

  render() {
    console.log('inside logout.jsx', localStorage.getItem('name'))
    return (
      <div>
        <div className='Welcome'>Hello {localStorage.getItem('name')} </div>
        <button onClick = {this.unAuth}> Logout </button>
      </div>
    );
  }
}

export default Logout;
