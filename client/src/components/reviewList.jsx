import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Review from './review.jsx';
import NavBar from './navBar.jsx';

class ReviewList extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEmail: '',
      reviewResults: []
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
    const that = this;
    console.log('email', email);
    axios.get('/getReviews',
    {
      params: email

    })
    .then(function(response){
      console.log("response.data: ", response.data)
      const filtered = [];
      for(const review of response.data) {
        filtered.push(review)
      }
      that.setState({
        reviewResults: filtered
      })
    })
    .catch(function(error) {
      console.error("there was an error retrieving this user's reviews", error);
    })
  }

  render() {
    var reviewMap = this.state.reviewResults.map((review, index) => {
      return <Review key={index} review={review} />
    })
    return (
      <div className="reviewContainer">
      <NavBar />
      <h1>Search for Reviews</h1>
      <form onSubmit = {this.submitEmailQuery}>
        <input type = 'text' value = {this.state.userEmail}  onChange={this.handleChange.bind(this, 'userEmail')}/>
        </form>
        <div className="reviewContainer">
        {reviewMap}
        </div>
      </div>

    )
  }

}

export default ReviewList;
