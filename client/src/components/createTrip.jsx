import React, {Component} from 'react';
import {render} from 'react-dom';

// Add form validation
class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = { driverName: '',
                   tripDate: '',
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
    let filled = true;
    for(var attr in this.state) {
      if(this.state[attr] === '') {
        filled = false;
      }
    }
    if(!filled) {
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
            placeholder = "Trip Date"
            value = {this.state.tripDate}
            onChange = {this.handleChange.bind(this, 'tripDate')} />
        </div>
        <div>
          <input
            placeholder = "Start street"
            value = {this.state.startSt}
            onChange = {this.handleChange.bind(this, 'startSt')} />
        </div>
        <div>
          <input
            placeholder = "Start city"
            value = {this.state.startCiy}
            onChange = {this.handleChange.bind(this, 'startCity')} />
        </div>
        <div>
          <input
            placeholder = "Start state"
            value = {this.state.startState}
            onChange = {this.handleChange.bind(this, 'startState')} />
        </div>
        <div>
          <input
            placeholder = "End street"
            value = {this.state.endSt}
            onChange = {this.handleChange.bind(this, 'endSt')} />
        </div>
        <div>
          <input
            placeholder = "End city"
            value = {this.state.endCity}
            onChange = {this.handleChange.bind(this, 'endCity')} />
        </div>
        <div>
          <input
            placeholder = "End state"
            value = {this.state.endState}
            onChange = {this.handleChange.bind(this, 'endState')} />
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
            placeholder = "Vehicle Make"
            value = {this.state.vehicleMake}
            onChange = {this.handleChange.bind(this, 'vehicleMake')} />
        </div>
        <div>
          <input
            placeholder = "Vehicle Model"
            value = {this.state.vehicleModel}
            onChange = {this.handleChange.bind(this, 'vehicleModel')} />
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
