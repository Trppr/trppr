import React, {Component} from 'react';
import { render } from 'react-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { endLocation: '',
                   startLocation: '',
                   numSeats: '',
                   price: '',
                   startDate: '',
                   endDate: ''
                 };
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitData() {
    this.props.infoStore(this.state);
    this.setState({ endLocation: '',
                   startLocation: '',
                   numSeats: '',
                   price: '',
                   startDate: '',
                   endDate: ''
                 });
  }

  render() {
    return (
      <form className="form-group">
      <div className="col-md-6" id="searchTripsLeft">
        <input
          type = "date"
          className="form-control"
          placeholder = "Starting date"
          value = {this.state.startDate}
          onChange = {this.handleChange.bind(this, 'startDate')}/>

          <input
          placeholder = "Starting city/state"
          className="form-control"
          value = {this.state.startLocation}
          onChange = {this.handleChange.bind(this, 'startLocation')} />

          <input
          type = "number"
          className="form-control"
          placeholder = "# of passengers?"
          value = {this.state.numSeats}
          onChange = {this.handleChange.bind(this, 'numSeats')} />

          </div>
          <div className="col-md-6" id="searchTripsRight">

        <input
          type = "date"
          className="form-control"
          placeholder = "Ending date"
          value = {this.state.endDate}
          onChange = {this.handleChange.bind(this, 'endDate')}/>

        <input
          placeholder = "Ending city/state"
          className="form-control"
          value = {this.state.endLocation}
          onChange = {this.handleChange.bind(this, 'endLocation')} />
      </div>
      <div className="col-md-6">
        <input
          type = "number"
          className="form-control"
          placeholder = "Max budget?"
          value = {this.state.price}
          onChange = {this.handleChange.bind(this, 'price')}/>

      </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Search"
          onClick = {event => this.submitData()}/>
      </form>

    )
  }
}

export default SearchBar;
