import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

const NavUserProfile = () => {
  return (
    <div className = 'navbar-form navbar-right'>
      <ul className = "nav navbar-nav">
      <form method="get" action="/userProfile">
        <button type="submit">Profile</button>
      </form>
      </ul>
    </div>

  )
}

export default NavUserProfile;
