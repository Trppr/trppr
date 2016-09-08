import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';
import braintree from 'braintree-web';
import axios from 'axios';

class Trip extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.reserveSeat = this.reserveSeat.bind(this);
    }

    reserveSeat() {
      var context=this;

      braintree.setup(localStorage.getItem('payToken'), 'custom', {
        paypal: {
          container: 'paypal-container'+this.props.trip.id,
          singleUse: true, // Required
          amount: context.props.trip.seatPrice, // Required
          currency: 'USD', // Required
          locale: 'en_us'
        },
        onPaymentMethodReceived: function (obj) {
          //doSomethingWithTheNonce(obj.nonce);
          console.log(obj);
          console.log("getting in payment")
          console.log(context.props.trip.seatPrice);
          obj.amount=context.props.trip.seatPrice;
          if(localStorage.getItem('token')) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
          }
          axios.post('/checkout',
            obj
          )
          .then(function (response) {
            console.log(response);
            console.log("sucessfulPayment!!")
            context.props.reserveSeat({passengerId: localStorage.getItem('id'), tripId: context.props.trip.id});
          })
          .catch(function (error) {
            console.log(error);
          })


        }
      });


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
                      
                      <div id={"paypal-container"+this.props.trip.id}></div>


                  </div>
              </div>

          </div>
      );
    }
}

export default Trip;
