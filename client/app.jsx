//if you require outside files at the top of the entry file defined when you
//call webpack in the terminal, webpack automatically bundles the linked files
var trip = require('./src/components/trip.jsx');
var tripList = require('./src/components/tripList.jsx');
var apple = require('./src/components/app.jsx');

class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}

render(<App/>, document.getElementById('app'));

// document.getElementById('root').appendChild(tripList());
// document.getElementById('root').appendChild(apple());
// document.getElementById('root').appendChild(trip());
