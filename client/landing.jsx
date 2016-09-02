import React, {Component} from 'react';
import {render} from 'react-dom';
import { hashHistory } from 'react-router'

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { endLocation: '' };
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitData() {
    hashHistory.push('/app');
  }

  render() {
    console.log('HashHistory inside landing.jsx', hashHistory)

    return (
      <div>
        <h1> Where are you going? </h1>
          <input
            className="form-control"
            placeholder = "Enter city/state"
            value = {this.state.endLocation}
            onChange = {this.handleChange.bind(this, 'endLocation')} />
          <input
            type="button"
            className="btn btn-primary"
            value="Search"
            onClick = {event => this.submitData()}/>
      </div>
    )
  }
}

export default Landing;
