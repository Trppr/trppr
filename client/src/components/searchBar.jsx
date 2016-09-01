import React, {Component} from 'react';
import {render} from 'react-dom';

// Start with functional and change it to a class when needed generally
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
      <nav className="navbar navbar-default">
      <div className="container-fluid">
      <form className="navbar-form navbar-left">
        <div className="form-group">
          <input
            type = "date"
            className="form-control"
            placeholder = "Starting date"
            value = {this.state.startDate}
            onChange = {this.handleChange.bind(this, 'startDate')}/>
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
          <input
            type = "number"
            className="form-control"
            placeholder = "Max budget?"
            value = {this.state.price}
            onChange = {this.handleChange.bind(this, 'price')}/>
          <input
            type="button"
            value="Search"
            onClick = {event => this.submitData()}
            className="btn btn-primary"/>
        </div>
      </form>
      </div>
      </nav>
    )
  }
}

export default SearchBar;
