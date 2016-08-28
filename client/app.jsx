//if you require outside files at the top of the entry file defined when you
//call webpack in the terminal, webpack automatically bundles the linked files
import React, { Component } from 'react';
import {render} from 'react-dom';

var trip = require('./src/components/trip.jsx');
import tripList from './src/components/tripList.jsx';
import SearchBar from './src/components/searchBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.routeSearch = this.routeSearch.bind(this);
  }

  routeSearch(searchTerm) {
    this.setState({searchTerm: searchTerm});
  }

  render () {
    return (
          <div>
            <SearchBar routeSearch={this.routeSearch}/>
            {tripList()}
          </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

// document.getElementById('root').appendChild(tripList());
// document.getElementById('root').appendChild(apple());
// document.getElementById('root').appendChild(trip());
