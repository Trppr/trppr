import React from 'react';
import {render} from 'react-dom';
import moment from 'moment';

const UserTrip = (props) => {
      console.log(props, 'inside userTrip.jsx')
      return (
          <div className="container" id="tripEntry">
              <div className="row" id="tripRow">
                  <div className="col-sm-3 other">
                      <div id="tripTag">Seats Available:</div>
                      <p>{props.trip.numSeats}</p>
                  </div>

                  <div className="col-sm-3 other">
                      <div id="tripTag">Price per Seat:</div>
                      <p>{props.trip.seatPrice}</p>
                  </div>

                  <div className="col-sm-3 other">
                      <div id="tripTag">Vehical Type/Model:</div>
                      <p>{props.trip.vehicleMake}, &nbsp; {props.trip.vehicleModel}, &nbsp; {props.trip.vehicleYear}</p>
                  </div>
              </div>

              <div className="row" id="tripRow">
                  <div className="col-sm-4 other">
                      <div id="tripTag">Trip Dates:</div>
                      <p>{moment(props.trip.tripDate).format('MM-DD-YYYY')}</p>
                  </div>

                  <div className="col-sm-4 other">
                      <div id="tripTag">Pick-up Address:</div>
                      <p>{props.trip.startSt}, &nbsp; {props.trip.startCity}, &nbsp; {props.trip.State}</p>
                  </div>

                  <div className="col-sm-4 other">
                      <div id="tripTag">Drop-off Address:</div>
                      <p>
                          {props.trip.endSt}, &nbsp; {props.trip.endCity}, &nbsp; {props.trip.endState}</p>
                  </div>
              </div>

              <div className="row" id="tripRow">
                  <div className="col-sm-12 other">
                      <div id="tripTag">Trip Details:</div>
                      <p>{props.trip.description}</p>
                  </div>
              </div>

          </div>
      );
}

export default UserTrip;
