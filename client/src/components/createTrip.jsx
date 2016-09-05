import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import axios from 'axios';

import NavBar from './navBar.jsx';
// Add form validation
class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = { tripDate: '',
                   startSt: '',
                   startCity: '',
                   startState: '',
                   endSt: '',
                   endCity: '',
                   endState: '',
                   numSeats: '',
                   seatPrice: '',
                   vehicleMake: '',
                   vehicleModel: '',
                   description: ''
                   };
    this.submitTrip = this.submitTrip.bind(this);
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitTrip(e) {
    e.preventDefault();
    let filled = true;
    for(var attr in this.state) {
      if(this.state[attr] === '') {
        filled = false;
      }
    }
    if(!filled) {
      render(<div> Please fill out all empty fields </div>, document.getElementById('create'));
    } else {
      render(<div></div>, document.getElementById('create'));
      this.makeTrip(this.state);
    }
  }

  makeTrip(tripObj) {
    if(localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    const that = this;
    tripObj.driverId = localStorage.getItem('id');
    tripObj.driverName = localStorage.getItem('name')
    axios.post('/createTrip',
      tripObj
    )
    .then(function (response) {
      console.log(response);
      browserHistory.push('/userProfile')
    })
    .catch(function (error) {
      render(<div> Please login. </div>, document.getElementById('create'));
      console.log(error);
    });
  }

  //Note: Change driver id to reflect the user signed in, in the future
  render() {
    return (
      <div>
        <NavBar />
        <form className="form-group" onSubmit={this.submitTrip}>
        <h1>Create Your Trip</h1>
        <div className="col-md-6" id="CreateAndSearchTripsLeft">
              <input
              placeholder = "Start street"
              className="form-control"
              value = {this.state.startSt}
              onChange = {this.handleChange.bind(this, 'startSt')} />

              <input
              placeholder = "Start city"
              className="form-control"
              value = {this.state.startCiy}
              onChange = {this.handleChange.bind(this, 'startCity')} />

              <input
              placeholder = "Start state"
              className="form-control"
              value = {this.state.startState}
              onChange = {this.handleChange.bind(this, 'startState')} />

            <input
              type = 'date'
              placeholder = "Trip Date"
              className="form-control"
              value = {this.state.tripDate}
              onChange = {this.handleChange.bind(this, 'tripDate')} />

            <input
              placeholder = "Description"
              className="form-control"
              value = {this.state.description}
              onChange = {this.handleChange.bind(this, 'description')} />

          </div>
          <div className="col-md-6" id="CreateAndSearchTripsRight">

            <input
              placeholder = "End street"
              className="form-control"
              value = {this.state.endSt}
              onChange = {this.handleChange.bind(this, 'endSt')} />

            <input
              placeholder = "End city"
              className="form-control"
              value = {this.state.endCity}
              onChange = {this.handleChange.bind(this, 'endCity')} />

            <input
              placeholder = "End state"
              className="form-control"
              value = {this.state.endState}
              onChange = {this.handleChange.bind(this, 'endState')} />

            <input
              type = 'number'
              className="form-control"
              placeholder = "# of Seats"
              value = {this.state.numSeats}
              onChange = {this.handleChange.bind(this, 'numSeats')} />

            <input
              type = 'number'
              className="form-control"
              placeholder = "Price per Seats"
              value = {this.state.seatPrice}
              onChange = {this.handleChange.bind(this, 'seatPrice')} />

            <input
              placeholder = "Vehicle Make"
              className="form-control"
              value = {this.state.vehicleMake}
              onChange = {this.handleChange.bind(this, 'vehicleMake')} />

            <input
              placeholder = "Vehicle Model"
              className="form-control"
              value = {this.state.vehicleModel}
              onChange = {this.handleChange.bind(this, 'vehicleModel')} />

          </div>
            <input type = 'submit' value = 'Create' className='btn btn-primary'/>
        </form>
      </div>
    )
  }
}

export default CreateTrip;
