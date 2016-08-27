import React from 'react';
module.exports = function() {
  const TripList = () => {

     const trips = ["Los Angeles - Las Vegas", "New York - Boston", "San Diego - San Francisco", "Portland - Seattle"];

     return (
       <div>
         <h3>Trip List</h3>
         <ul>
           {trips.map((trip) => {
             return <li>{trip}</li>
           })}
         </ul>
       </div>
     );
   }


  ReactDOM.render(<TripList />, document.getElementById('tripList'));
}
