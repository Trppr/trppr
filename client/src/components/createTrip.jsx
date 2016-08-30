import React, {Component} from 'react';
import {render} from 'react-dom';

// Add form validation
class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = { driverName: '',
                   tripDate: '',
                   startLocation: '',
                   endLocation: '',
                   numSeats: '',
                   seatPrice: '',
                   vehicleType: '',
                   description: '',
                   driverId: ''
                   };
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitTrip() {
    if(this.state.driverName === '' || this.state.tripData === '' || this.state.startLocation === ''
      || this.state.endLocation === '' || this.state.numSeats === '' || this.state.seatPrice === ''
      || this.state.vehicleType === '') {
        render(<div> Please fill out all fields </div>, document.getElementById('create'));
      } else {
          render(<div></div>, document.getElementById('create'));
          this.props.makeTrip(this.state);
        }
  }

  render() {
    return (
      <form>
        <div>
          <input
            placeholder = "Driver name"
            value = {this.state.driverName}
            onChange = {this.handleChange.bind(this, 'driverName')} />
        </div>
        <div>
          <input
            placeholder = "Start Location"
            value = {this.state.startLocation}
            onChange = {this.handleChange.bind(this, 'startLocation')} />
        </div>
        <div>
          <input
            placeholder = "End Location"
            value = {this.state.endLocation}
            onChange = {this.handleChange.bind(this, 'endLocation')} />
        </div>
        <div>
          <input
            type = 'number'
            placeholder = "# of Seats"
            value = {this.state.numSeats}
            onChange = {this.handleChange.bind(this, 'numSeats')} />
        </div>
        <div>
          <input
            type = 'number'
            placeholder = "Price per Seats"
            value = {this.state.seatPrice}
            onChange = {this.handleChange.bind(this, 'seatPrice')} />
        </div>
        <div>
          <input
            placeholder = "Vehicle Type"
            value = {this.state.vehicleType}
            onChange = {this.handleChange.bind(this, 'vehicleType')} />
        </div>
        <div>
          <input
            placeholder = "Description"
            value = {this.state.description}
            onChange = {this.handleChange.bind(this, 'description')} />
        </div>
        <div>
          <input
            placeholder = "Driver Id"
            value = {this.state.driverId}
            onChange = {this.handleChange.bind(this, 'driverId')} />
        </div>
        <div>
          <input
            type="button"
            value="Create"
            onClick = {event => this.submitTrip()}/>
        </div>
      </form>
    )
  }
}

export default CreateTrip
