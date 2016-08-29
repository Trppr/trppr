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

  handleEndLocation(endLocation) {
    this.setState({endLocation});
  }

  handleStartLocation(startLocation) {
    this.setState({startLocation});
  }

  handleNumSeats(numSeats) {
    this.setState({numSeats});
  }

  handlePrice(price) {
    this.setState({price});
  }

  submitData() {
    this.props.infoStore(this.state);
  }

  render() {
    return (
      <form>
        <div>
          <div>
            <input
              placeholder = "Where to?"
              value = {this.state.endLocation}
              onChange = {event => this.handleEndLocation(event.target.value)} />
          </div>
          <div>
            <input
              placeholder = "Where are you?"
              value = {this.state.startLocation}
              onChange = {event => this.handleStartLocation(event.target.value)}/>
          </div>
          <div>
            <input
              placeholder = "# of passengers?"
              value = {this.state.numSeats}
              onChange = {event => this.handleNumSeats(event.target.value)}/>
          </div>
          <div>
            <input
              placeholder = "Max budget?"
              value = {this.state.price}
              onChange = {event => this.handlePrice(event.target.value)}/>
          </div>
          <div>
            <input
              type="button"
              value="Search"
              onClick = {event => this.submitData()}/>
          </div>
        </div>
      </form>
    )
  }
}

export default SearchBar;
