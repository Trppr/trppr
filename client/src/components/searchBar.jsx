import React, {Component} from 'react';
import {render} from 'react-dom';

// Start with functional and change it to a class when needed generally
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { endLocation: '',
                   startLocation: '',
                   numSeats: '',
                   price: ''
                 };
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitData() {
    this.props.infoStore(this.state);
  }

  render() {
    return (
      <form>
        <div>
          <input
            placeholder = "Where to?"
            value = {this.state.endLocation}
            onChange = {this.handleChange.bind(this, 'endLocation')} />
          <input
            placeholder = "Where are you?"
            value = {this.state.startLocation}
            onChange = {this.handleChange.bind(this, 'startLocation')} />
          <input
            type = "number"
            placeholder = "# of passengers?"
            value = {this.state.numSeats}
            onChange = {this.handleChange.bind(this, 'numSeats')} />
          <input
            type = "number"
            placeholder = "Max budget?"
            value = {this.state.price}
            onChange = {this.handleChange.bind(this, 'price')}/>
          <input
            type="button"
            value="Search"
            onClick = {event => this.submitData()}/>
        </div>
      </form>
    )
  }
}

export default SearchBar;
