import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import axios from 'axios';

const Review = (props) => {
  console.log("props in review: ", props)
  return (
    <div className ="container">
      <p className="review">{props.review.description}</p>
    </div>
  );
}

export default Review;
