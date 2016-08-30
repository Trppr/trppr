import React from 'react';
import {render} from 'react-dom';

  const Trip = ({trip}) => {
    console.log("trip insidee trip.jsx: ", trip.driverName);
     return (
       <div className="tripEntry">
            <li>
            Driver name: {trip.driverName}, &nbsp;
            Trip dates: {trip.tripDate}, &nbsp;
            {trip.startLocation} - {trip.endLocation}, &nbsp;
            Number of seats available: {trip.numSeats}, &nbsp;
            Price of seat: {trip.seatPrice}, &nbsp;
            Vehicle Type: {trip.vehicleType}
            </li>
       </div>
     );
  }

export default Trip;
