import React from 'react';
import {render} from 'react-dom';
import Trip from './trip.jsx';

//Need to make trip const, each trip needs to read each object and
//display different values based on each attribute on the object
  const TripList = (props) => {
    console.log("props.trips: ", props.trips);
     return (
       <div>
         <h3>Trip List</h3>
         <ul>
           {props.trips.map((trip, index) => {
            return <Trip key={index} trip={trip}/>
           })}
         </ul>
       </div>
     );
  }

export default TripList;
