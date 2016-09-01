import React from 'react';
import {render} from 'react-dom';
import Trip from './trip.jsx';

//Need to make trip const, each trip needs to read each object and
//display different values based on each attribute on the object
  const TripList = (props) => {
    console.log("props.trips: ", props.trips);
     //const trips = ["Los Angeles - Las Vegas", "New York - Boston", "San Diego - San Francisco", "Portland - Seattle"];
     return (
       <div>
         <h3>Trip List</h3>
         <ul>
           {props.trips.map((trip, index) => {
            // return <div key={index}>{trip}</div>
            return <Trip key={index} trip={trip}/>
           })}
         </ul>
       </div>
     );
  }

export default TripList;
