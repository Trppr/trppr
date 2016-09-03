import React, {Component} from 'react';
import {render} from 'react-dom';
import Login from './login.jsx'

const NavBar = (props) => {
  return (
    <nav className = 'navbar navbar-default navbar-fixed-top'>
      <div className = 'container-fluid'>
        <a className = 'navbar-brand'
           href = '#'> Trppr </a>
        <form className = 'navbar-form navbar-right'>
          <Link to="/createTrip">Create Trip</Link>
          <Link to='/signUp'>Sign Up</Link>
          <Login />
        </form>
      </div>
    </nav>
  );
}

export default NavBar;