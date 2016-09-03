//if you require outside files at the top of the entry file defined when you
//call webpack in the terminal, webpack automatically bundles the linked files
import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {render} from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import TripList from './src/components/tripList.jsx';
import SearchBar from './src/components/searchBar.jsx';
import NavBar from './src/components/navBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '',
                   tripResults: [],
                   Authorization: '',
                   landingLocation: ''
                 };
    this.infoStore = this.infoStore.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  infoStore(searchObj) {
    this.setState({searchTerm: searchObj});
    this.getTrips(searchObj);
  }

  getTrips(searchObj) {
    const that = this;
    if(searchObj.startDate && searchObj.startDate !== '')
      searchObj.startDate = moment(searchObj.startDate).format('MM-DD-YYYY');
    if(searchObj.endDate && searchObj.endDate !== '')
      searchObj.endDate = moment(searchObj.endDate).format('MM-DD-YYYY');
    axios.get('/searchTrips', {
      params: searchObj
      }
    )
    .then(function (response) {
      that.setState({tripResults: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  checkUser(userObj) {
    const that = this;
    axios.post('/login',
      userObj
    )
    .then(function (response) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  createUser(newUserObj) {
    const that = this;
    axios.post('/signup',
      newUserObj)
    .then(function(response) {
      console.log("new user created: ", response);
    })
    .catch(function(error) {
      render(<div> User email already exists. Please enter a different email address. </div>, document.getElementByID('create'));
      console.log(error);
    })
  }



  render () {
    if(this.props.params.location) {
      this.state.landingLocation = this.props.params.location;
      this.getTrips({endLocation: this.state.landingLocation})
      this.props.params.location = undefined;
      this.state.landingLocation = ''
    }
    return (
          <div>
          <NavBar />
           <div className="container">
             <h1>Detailed Search</h1>
             <SearchBar infoStore={this.infoStore}/>
           </div>
            <TripList trips={this.state.tripResults}/>
          </div>
    )
  }
}

export default App;
// render(<App/>, document.getElementById('app'));
//render(<Route history={hashHistory}>
// render((
//   <Router history={hashHistory}>
//     <Route path='/' component={Landing} />
//     <Route path='app' component={App} />
//   </Router>
// ), document.getElementById('app'));
// document.getElementById('root').appendChild(tripList());
// document.getElementById('root').appendChild(apple());
// document.getElementById('root').appendChild(trip());
