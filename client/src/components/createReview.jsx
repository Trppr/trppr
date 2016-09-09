import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import axios from 'axios';

class CreateReview extends Component {
  constructor(props) {
    super(props);
  }
  this.state = {
    //do these keys need to be the same name as the attribute within the database?
    userEmail: '',
    description:''
  }

  submitReview(reviewObj){
    
  }


}
