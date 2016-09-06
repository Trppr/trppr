import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

const NavUserProfile = () => {
  return (
    <div className = 'navbar-form navbar-right'>
      <ul className = "nav navbar-nav">
      <Link to='/userProfile'>Profile</Link>
      </ul>
    </div>

  )
}

export default NavUserProfile;
