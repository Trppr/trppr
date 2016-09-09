import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import axios from 'axios';


class ReviewList extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEmail: ''
    };
    this.submitEmailQuery = this.submitEmailQuery.bind(this);
  }
  submitEmailQuery(e){
    e.preventDefault()
    this.getReviews(this.state);
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  getReviews(email) {
    console.log('email', email);
    axios.get('/getReviews',
    {
      params: email

    }
  )
    .then(function(response){
      console.log("response.data: ", response.data)

    })
    .catch(function(error) {
      console.error("there was an error retrieving this user's reviews")
    })
  }

  render() {
    return (
      <div className="container">
      <h1>Search for reviews</h1>
      <form onSubmit = {this.submitEmailQuery}>
        <input type = 'text' value = {this.state.userEmail}  onChange={this.handleChange.bind(this, 'userEmail')}/>
        </form>
      </div>

    )
  }

}

export default ReviewList;
