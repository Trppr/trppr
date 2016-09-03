import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app.jsx'
import NavBar from './src/components/navBar.jsx';
import CreateTrip from './src/components/createTrip.jsx';
import Signup from './src/components/signUp.jsx';

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
    browserHistory.push(link);
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
  <Router history={browserHistory}>
    <Route path='/' component={Landing} />
    <Route path='app(/:location)' name='app' component={App} />
    <Route path='createTrip' component={CreateTrip} />
    <Route path='signUp' component={Signup} />
  </Router>
), document.getElementById('app'));
