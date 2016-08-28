import React, {Component} from 'react';
import {render} from 'react-dom';

// Start with functional and change it to a class when needed generally
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onType(term) {
    this.setState({term});
  }

  render() {
    console.log(this.props.routeSearch);
    return (
      <div className="search-bar">
        <input
          value = {this.state.term}
          onChange = {event => this.onType(event.target.value)} />
        <input
          type="submit"
          value="Search" />
      </div>
    )
  }
}

export default SearchBar;
