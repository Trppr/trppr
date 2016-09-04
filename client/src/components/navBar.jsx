import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import Login from './login.jsx'

const NavBar = (props) => {

  return (
    <nav className = 'navbar navbar-default navbar-fixed-top'>
      <div className = 'container-fluid'>
        <a className = 'navbar-brand'
           href = '/'> Trppr </a>
        <div className = 'navbar-form navbar-right'>
          <Link to="/createTrip">Create Trip</Link>
          <Link to='/signUp'>Sign Up</Link>
          <Login/>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
