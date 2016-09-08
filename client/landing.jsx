import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Geosuggest from 'react-geosuggest'; 

import App from './app.jsx'
import NavBar from './src/components/navBar.jsx';
import CreateTrip from './src/components/createTrip.jsx';
import Signup from './src/components/signUp.jsx';
import Logout from './src/components/logout.jsx';
import UserProfile from './src/components/userProfile.jsx';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { endLocation: '' };
    this.submitData = this.submitData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log('current input val', value);
    this.setState( {endLocation: value} );
  }

  submitData(e) {
    e.preventDefault();
    const link = '/app/' + this.state.endLocation
    browserHistory.push(link);
  }


  render() {
    return (
      <div id="landingBody">
        <img id="landingLogo" src="trpperLogo-small.png"></img>
        <div id="landingBodyPane">
          <div className="container">
            <h1> Where are you going? </h1>
              <form onSubmit={this.submitData}>

                <Geosuggest 
                type="text"
                name="search"
                className="form-control"
                placeholder = "Enter a city name"
                onSuggestSelect={this.onSuggestSelect}
                value = {this.state.endLocation}
                onChange = {this.handleChange} 
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />

              </form>
          </div>
        </div>
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path='/' component={Landing} />
    <Route path='app(/:location)' name='app' component={App} />
    <Route path='create' component={CreateTrip} />
    <Route path='signUp' component={Signup} />
    <Route path='logOut' component={Logout} />
    <Route path='userProfile' component={UserProfile} />
  </Router>
), document.getElementById('app'));
