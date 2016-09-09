import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import Login from './login.jsx';
import Logout from './logout.jsx';
import NavUserProfile from './navUserProfile.jsx';
import NavSignUp from './navSignUp.jsx';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkAuth() {
    if(localStorage.getItem('token')) {
      return <div><NavUserProfile/><Logout/></div>
    } else {
      return <div><NavSignUp/><Login/></div>
    }
  }

  render() {
    return (
      <nav className ="navbar navbar-default navbar-fixed-top">
        <div className ="container-fluid">
          <a className ="navbar-brand" href = "/">
            <img id="navLogo" src="../trpperLogo-small.png"></img>
          </a>

          <ul className = "nav navbar-nav">
            <li className="navItem"><Link to="/create">Create Trip</Link></li>
            <li className="navItem"><Link to="/app">Search Trips</Link></li>
            <li className="navItem"><Link to="/createReview">Write a Review</Link></li>
          </ul>
          {this.checkAuth()}
        </div>
      </nav>
    );
  }
}

export default NavBar;
