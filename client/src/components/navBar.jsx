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
    if(localStorage.getItem('token')) {
      return <div><Logout/><Link to='/userProfile'>Profile</Link></div>;
    } else {
      return <div><Login/><Link to='/signUp'>Sign Up</Link> </div>;
    }
  }

  render() {
    return (
      <nav className = 'navbar navbar-default navbar-fixed-top'>
        <div className = 'container-fluid'>
          <a className = 'navbar-brand' href = '/'>
             <img id="navLogo" src="../trpperLogo-small.png"></img>
          </a>
         <ul className = "nav navbar-nav">
            <li><Link to="/createTrip">Create Trip</Link></li>
            <li><Link to="/app">Search Trips</Link></li>
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
