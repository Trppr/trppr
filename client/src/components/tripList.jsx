import React from 'react';
import {render} from 'react-dom';
import Trip from './trip.jsx';

//Need to make trip const, each trip needs to read each object and
//display different values based on each attribute on the object
  const TripList = (props) => {
     return (
       <div className="container">
         <h1>Search Results</h1>
         <div className="tripContainer">
           {props.trips.map((trip, index) => {
            return <Trip key={index} trip={trip}/>
           })}
         </div>
       </div>
     );
  }

export default TripList;
