import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

const NavSignUp = () => {
  return (
    <div className = 'navbar-form navbar-right'>
      <ul className = "nav navbar-nav">
        <form method="get" action="/signUp">
          <button className="btn btn-default" id="signup" type="submit">Sign Up</button>
        </form>
      </ul>
    </div>
  )
}

export default NavSignUp;
