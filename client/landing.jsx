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
import ReviewList from './src/components/reviewList.jsx';

import CreateReview from './src/components/createReview.jsx';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { endLocation: '' };
    this.submitData = this.submitData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  handleChange(e) {
    console.log('current input val', e);
    this.setState( {endLocation: e} );
  }

  submitData(e) {
    e.preventDefault();
    const link = '/app/' + this.state.endLocation
    browserHistory.push(link);
  }

  onSuggestSelect(suggest) {
    console.log(suggest);
    this.setState( {endLocation: suggest.label} );
  }


  render() {
    var fixtures = [
      {label: 'Los Angeles', location: {lat: 34.0522, lng: 118.2437}},
      {label: 'Philadelphia', location: {lat: 39.9526, lng: 75.1652}},
      {label: 'San Francisco', location: {lat: 37.7749, lng: 122.4194}}
    ];
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
                fixtures={fixtures}
                country = 'us'
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
    <Route path='createReview' component={CreateReview} />
    <Route path='reviewList' component={ReviewList} />
  </Router>
), document.getElementById('app'));
