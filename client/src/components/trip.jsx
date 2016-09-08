import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';

class Trip extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.reserveSeat = this.reserveSeat.bind(this);
      
      // braintree.setup('CLIENT-TOKEN-FROM-SERVER', 'dropin', {
      //   container: 'dropin-container'
      // });
    }

    reserveSeat() {
      this.props.reserveSeat({passengerId: localStorage.getItem('id'), tripId: this.props.trip.id});
    }

    render() {
      return (
          <div className="container" id="tripEntry">

              <div className="row" id="tripRow">
                  <div className="col-sm-3 other">
                      <div id="tripTag">Driver Name:</div>
                      <p>{this.props.trip.driverName}</p>
                  </div>

                  <div className="col-sm-3 other">
                      <div id="tripTag">Seats Available:</div>
                      <p>{this.props.trip.numSeats}</p>
                  </div>

                  <div className="col-sm-3 other">
                      <div id="tripTag">Price per Seat:</div>
                      <p>$ {this.props.trip.seatPrice}</p>
                  </div>

                  <div className="col-sm-3 other">
                      <div id="tripTag">Vehical Type/Model:</div>
                      <p>{this.props.trip.vehicleMake}, &nbsp; {this.props.trip.vehicleModel}, &nbsp; {this.props.trip.vehicleYear}</p>
                  </div>
              </div>

              <div className="row" id="tripRow">
                  <div className="col-sm-4 other">
                      <div id="tripTag">Trip Dates:</div>
                      <p>{moment(this.props.trip.tripDate).format('MM-DD-YYYY')}</p>
                  </div>

                  <div className="col-sm-4 other">
                      <div id="tripTag">Pick-up Address:</div>
                      <p>{this.props.trip.startSt}, &nbsp; {this.props.trip.startCity}, &nbsp; {this.props.trip.startState}</p>
                  </div>

                  <div className="col-sm-4 other">
                      <div id="tripTag">Drop-off Address:</div>
                      <p>
                          {this.props.trip.endSt}, &nbsp; {this.props.trip.endCity}, &nbsp; {this.props.trip.endState}</p>
                  </div>
              </div>

              <div className="row" id="tripRow">
                  <div className="col-sm-12 other">
                      <div id="tripTag">Trip Details:</div>
                      <p>{this.props.trip.description}</p>
                      <button id="rsvpButton" onClick= {this.reserveSeat} >Book Seat</button>
                      <form>
                        <div id="dropin-container"></div>
                      </form>
                  </div>
              </div>

          </div>
      );
    }
}

export default Trip;
