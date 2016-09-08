import React, {Component} from 'react';
import { render } from 'react-dom';
import Geosuggest from 'react-geosuggest';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { endLocation: '',
                   startLocation: '',
                   numSeats: '',
                   price: '',
                   startDate: '',
                   endDate: ''
                 };
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitData() {
    this.props.infoStore(this.state);
    this.setState({ endLocation: '',
                   startLocation: '',
                   numSeats: '',
                   seatPrice: '',
                   startDate: '',
                   endDate: ''
                 });
  }

  render() {
    return (
      <form className="form-group">
      <div className="col-md-6" id="CreateAndSearchTripsLeft">

       <div id="gs">
        <Geosuggest
          className="form-control"
          placeholder="Starting city/state"
          value = {this.state.startLocation}
          onChange = {this.handleChange.bind(this, 'startLocation')}
          onSuggestSelect={this.onSuggestSelect}
        />
       </div>
        <input
          type = "date"
          className="form-control"
          placeholder = "Starting date"
          value = {this.state.startDate}
          onChange = {this.handleChange.bind(this, 'startDate')}/>

        <input
          type = "number"
          className="form-control"
          placeholder = "# of passengers?"
          value = {this.state.numSeats}
          onChange = {this.handleChange.bind(this, 'numSeats')} />
      </div>

      <div className="col-md-6" id="CreateAndSearchTripsRight">
        <div id='gs'>
         <Geosuggest
          className="form-control"
          placeholder="Ending city/state"
          value = {this.state.endLocation}
          onChange = {this.handleChange.bind(this, 'endLocation')}
          onSuggestSelect={this.onSuggestSelect}
         />
        </div> 


        <input
          type = "date"
          className="form-control"
          placeholder = "Ending date"
          value = {this.state.endDate}
          onChange = {this.handleChange.bind(this, 'endDate')}/>

        <input
          type = "number"
          className="form-control"
          placeholder = "Max budget?"
          value = {this.state.seatPrice}
          onChange = {this.handleChange.bind(this, 'seatPrice')}/>
      </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Search"
          onClick = {event => this.submitData()}/>
      </form>
      
    )
  }
}

export default SearchBar;
