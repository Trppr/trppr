import React from 'react';
import {render} from 'react-dom';
  const TripList = () => {
     const trips = ["Los Angeles - Las Vegas", "New York - Boston", "San Diego - San Francisco", "Portland - Seattle"];
     return (
       <div>
         <h3>Trip List</h3>
         <ul>
           {trips.map((trip, index) => {
             return <div key={index}>{trip}</div>
           })}
         </ul>
       </div>
     );
  }

export default TripList;
