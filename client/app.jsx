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
import CreateTrip from './src/components/createTrip.jsx';
import Login from './src/components/login.jsx';
import Signup from './src/components/signUp.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '',
                   tripResults: [],
                   Authorization: '',
                   landingLocation: '',
                   isLoading: ''
                 };
    this.infoStore = this.infoStore.bind(this);
  }

  infoStore(searchObj) {
    this.setState({searchTerm: searchObj});
    this.getTrips(searchObj);
  }

  getTrips(searchObj) {
    const that = this;
    that.setState({isLoading: true});
    if(searchObj.startDate && searchObj.startDate !== '')
      searchObj.startDate = moment(searchObj.startDate).format('MM-DD-YYYY');
    if(searchObj.endDate && searchObj.endDate !== '')
      searchObj.endDate = moment(searchObj.endDate).format('MM-DD-YYYY');
    axios.get('/searchTrips', {
      params: searchObj
      }
    )
    .then(function (response) {
      const filtered = [];
      for(const trip of response.data) {
        if(trip.numSeats > 0) {
          filtered.push(trip);
        }
      }
      that.setState({tripResults: filtered,
                    isLoading: false
                  });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  reserveSeat(reserveObj) {
    if(localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    axios.post('/reserveSeat',
      reserveObj
    )
    .then(function (response) {
      console.log('Seat reserved!', response.data)
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
    if (this.state.isLoading) {
      return (
            <div>
            <NavBar />
             <div className="container">
               <h1>Detailed Search</h1>
               <SearchBar infoStore={this.infoStore}/>
             </div>
               <img src={'../spinner.gif'} className="spinner"/>
            </div>
      )
    }
    else {
      return (
          <div>
          <NavBar />
           <div className="container">
             <h1>Detailed Search</h1>
             <SearchBar infoStore={this.infoStore}/>
           </div>

            <TripList reserveSeat={this.reserveSeat} trips={this.state.tripResults}/>

          </div>
      )
    }
  }
}

export default App;
