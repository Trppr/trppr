import React from 'react';
import {render} from 'react-dom';
import UserTrip from './userTrip.jsx';

  const UserTrips = (props) => {
     return (
       <div className="container">
         <div className="tripContainer">
           {props.trips.map((trip, index) => {
            return <UserTrip key={index} trip={trip} />
           })}
         </div>
       </div>
     );
  }

export default UserTrips;
