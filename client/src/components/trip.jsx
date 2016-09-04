import React from 'react';
import {render} from 'react-dom';
import moment from 'moment';

const Trip = ({trip}) => {
    //console.log("trip inside trip.jsx: ", trip.driverName);
    return (
        <div className="container" id="tripEntry">

            <div className="row" id="tripRow">
                <div className="col-sm-3 other">
                    <div id="tripTag">Driver Name:</div>
                    <p>{trip.driverName}</p>
                </div>

                <div className="col-sm-3 other">
                    <div id="tripTag">Seats Available:</div>
                    <p>{trip.numSeats}</p>
                </div>

                <div className="col-sm-3 other">
                    <div id="tripTag">Price per Seat:</div>
                    <p>${trip.seatPrice}</p>
                </div>

                <div className="col-sm-3 other">
                    <div id="tripTag">Vehical Type/Model:</div>
                    <p>{trip.vehicleMake}, &nbsp; {trip.vehicleModel}, &nbsp; {trip.vehicleYear}</p>
                </div>
            </div>

            <div className="row" id="tripRow">
                <div className="col-sm-4 other">
                    <div id="tripTag">Trip Dates:</div>
                    <p>{moment(trip.tripDate).format('MM-DD-YYYY')}</p>
                </div>

                <div className="col-sm-4 other">
                    <div id="tripTag">Pick-up Address:</div>
                    <p>{trip.startSt}, &nbsp; {trip.startCity}, &nbsp; {trip.State}</p>
                </div>

                <div className="col-sm-4 other">
                    <div id="tripTag">Drop-off Address:</div>
                    <p>
                        {trip.endSt}, &nbsp; {trip.endCity}, &nbsp; {trip.endState}</p>
                </div>
            </div>

            <div className="row" id="tripRow">
                <div className="col-sm-12 other">
                    <div id="tripTag">Trip Details:</div>
                    <p>{trip.description}</p>

                    <div className="rsvpButton">
                        <input placeholder="How many seats?"/>
                        <button>Reserve Seat</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Trip;
