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
        <ul className = "nav navbar-nav">
           <li><Link to="/createTrip">Create Trip</Link></li>
           <li><Link to='/signUp'>Sign Up</Link></li>
        </ul>
        <form className = 'navbar-form navbar-right'>
          <Login/>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
