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
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('description')
    browserHistory.push('/app');
  }

  render() {
    return (

      <div className = 'navbar-form navbar-right'>
        <ul className = "nav navbar-nav">
          <li><div className='Welcome'>Hello {localStorage.getItem('name')} </div></li>
          <li><button className="btn btn-default" onClick = {this.unAuth}> Logout </button></li>
        </ul>
      </div>
    );
  }
}

export default Logout;
