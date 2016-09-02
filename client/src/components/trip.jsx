import React from 'react';
import {render} from 'react-dom';

  const Trip = ({trip}) => {
    console.log("trip insidee trip.jsx: ", trip.driverName);
     return (
       <section className="tripEntry">

            <div className="driverName">
              <div>Driver name:</div>
              <p>{trip.driverName}</p>
            </div>

            <div className="seats">
              <div>Seats available:</div>
              <p>{trip.numSeats}<p>
            </div>

            <div className="price">
              <div>Price of seat:</div>
              <p>${trip.seatPrice}</p>
            </div>

            <div className="vehicle">
              <div>Vehicle Details:</div>
              <p>{trip.vehicleMake}, &nbsp; {trip.vehicleModel}, &nbsp; {trip.vehicleYear}</p>
            </div>

            <div className="tripDates">
              <div>Trip dates:</div>
              <p>{trip.tripDate}</p>
            </div>

            <div className="tripStart">
              <div>Pick-up:</div>
              <p>{trip.startSt}, &nbsp; {trip.startCity}, &nbsp; {trip.State}</p>
            </div>

            <div className="tripEnd">
              <div>Drop-off:</div>
              <p> {trip.endSt}, &nbsp; {trip.endCity}, &nbsp; {trip.endState}</p>
            </div>

            <div className="tripDetails">
              <div>Other trip details</div>
              <p>{trip.description}</p>
            </div>

       </section>

     );
  }

export default Trip;
