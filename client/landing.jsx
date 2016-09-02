import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app.jsx'

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
    const link = '/app/' + this.state.endLocation
    hashHistory.push(link);
  }

  render() {
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

render((
  <Router history={hashHistory}>
    <Route path='/' component={Landing} />
    <Route path='app(/:location)' name='app' component={App} />
  </Router>
), document.getElementById('app'));
