import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

const NavSignUp = () => {
  return (
    <div className = 'navbar-form navbar-right'>
    <form method="get" action="/signUp">
      <button type="submit">Sign Up</button>
    </form>
    </div>
  )
}

export default NavSignUp;
