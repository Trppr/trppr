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
    this.onSuggestStartSelect = this.onSuggestStartSelect.bind(this);
    this.onSuggestEndSelect = this.onSuggestEndSelect.bind(this);
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

  onSuggestStartSelect(suggest){
    console.log('suggest', suggest);
    this.state.startLocation = suggest.gmaps.address_components[0].long_name;
  }

  onSuggestEndSelect(suggest){
    console.log('suggest', suggest);
    this.state.endLocation = suggest.gmaps.address_components[0].long_name;
  }


  render() {
    return (
      <form className="form-group">
      <div className="col-md-6" id="CreateAndSearchTripsLeft">

       <div id="gs">
        <Geosuggest 
          type="text"
          name= "startAddress"
          className="form-control"
          placeholder = "Starting city/state"
          onSuggestSelect={this.onSuggestStartSelect}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
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

        <div id="gs">
        <Geosuggest 
          type="text"
          name= "endAddress"
          className="form-control"
          placeholder = "Ending city/state"
          onSuggestSelect={this.onSuggestEndSelect}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
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
