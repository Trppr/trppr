import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import Login from './login.jsx';
import Logout from './logout.jsx';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkAuth() {
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')) {
      return <div><Link to="/createTrip">Create Trip</Link><Logout/></div>;
    } else {
      return <div><Login/><Link to='/signUp'>Sign Up</Link> </div>;
    }
  }

  render() {
    return (
      <nav className = 'navbar navbar-default navbar-fixed-top'>
        <div className = 'container-fluid'>
          <a className = 'navbar-brand'
             href = '/'> Trppr </a>
         <ul className = "nav navbar-nav">
            <li><Link to="/createTrip">Create Trip</Link></li>
        </ul>
          <div className = 'navbar-form navbar-right'>
            {this.checkAuth()}

          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
