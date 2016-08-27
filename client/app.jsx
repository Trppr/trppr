//if you require outside files at the top of the entry file defined when you
//call webpack in the terminal, webpack automatically bundles the linked files
import React from 'react';
import {render} from 'react-dom';

var trip = require('./src/components/trip.jsx');
import tripList from './src/components/tripList.jsx';
import searchBar from './src/components/searchBar.jsx';

class App extends React.Component {
  render () {
    return <div> {tripList()} </div>;
  }
}

render(<App/>, document.getElementById('app'));

// document.getElementById('root').appendChild(tripList());
// document.getElementById('root').appendChild(apple());
// document.getElementById('root').appendChild(trip());
