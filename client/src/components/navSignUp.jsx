import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

const NavSignUp = () => {
  return (
    <div className = 'navbar-form navbar-right'>
    <input type = 'submit' value = 'Sign Up' className = 'btn btn -default'/>
    <Link to='/signUp'>Sign Up</Link>
  
    </div>
  )
}

export default NavSignUp;
