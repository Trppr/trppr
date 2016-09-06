import React from 'react';
import {render} from 'react-dom';
import Trip from './trip.jsx';

  const TripList = (props) => {
     console.log('props inside triplist', props)
     return (
       <div className="container">
         <div className="tripContainer">
           {props.trips.map((trip, index) => {
            return <Trip key={index} trip={trip} reserveSeat={props.reserveSeat}/>
           })}
         </div>
       </div>
     );
  }

export default TripList;
