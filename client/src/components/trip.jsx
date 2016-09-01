import React from 'react';
import {render} from 'react-dom';

  const Trip = ({trip}) => {
    console.log("trip insidee trip.jsx: ", trip.driverName);
     return (
       <div className="tripEntry">
            <li>
            Driver name: {trip.driverName}, &nbsp;
            Trip dates: {trip.tripDate}, &nbsp;
            Pick-up: {trip.startSt}, &nbsp; {trip.startCity}, &nbsp; {trip.State}, &nbsp;
            Drop-off: {trip.endSt}, &nbsp; {trip.endCity}, &nbsp; {trip.endState}, &nbsp;
            Seats available: {trip.numSeats}, &nbsp;
            Price of seat: {trip.seatPrice}, &nbsp;
            Vehicle Details: {trip.vehicleMake}, &nbsp; {trip.vehicleModel}, &nbsp; {trip.vehicleYear}, &nbsp;
            Other trip details: {trip.description};
            </li>
       </div>
     );
  }

export default Trip;
