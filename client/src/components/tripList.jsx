import React from 'react';
import {render} from 'react-dom';
import Trip from './trip.jsx';

//Need to make trip const, each trip needs to read each object and
//display different values based on each attribute on the object
  const TripList = (props) => {
<<<<<<< HEAD
=======
    console.log("props.trips: ", props.trips);
>>>>>>> b66ae9953cdeace0223c12a76822ecabc0b3ea76
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
