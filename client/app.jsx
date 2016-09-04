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
      that.setState({tripResults: response.data,
                    isLoading: false
                  });
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

    if (this.state.isLoading) {
      return (
            <div>
            <NavBar checkUser={this.checkUser}/>
             <div className="container">
               <h1>Detailed Search</h1>
               <SearchBar infoStore={this.infoStore}/>
             </div>
               <img src={'./spinner.gif'} className="spinner"/>
            </div>
      )
    }
    else {
      return (
          <div>
          <NavBar checkUser={this.checkUser}/>
           <div className="container">
             <h1>Detailed Search</h1>
             <SearchBar infoStore={this.infoStore}/>
           </div>
             <TripList trips={this.state.tripResults}/>
          </div>
      )
    }
  }
}

export default App;
