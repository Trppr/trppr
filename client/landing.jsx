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
    this.submitData = this.submitData.bind(this);
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitData(e) {
    e.preventDefault();
    const link = '/app/' + this.state.endLocation
    browserHistory.push(link);
  }

  render() {
    return (
        <div>
          <h1> Where are you going? </h1>
            <form onSubmit={this.submitData}>
            <input
              className="form-control"
              placeholder = "Enter city/state"
              value = {this.state.endLocation}
              onChange = {this.handleChange.bind(this, 'endLocation')} />
            <input type="submit" value="Search"/>
            </form>
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
