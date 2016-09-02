import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {render} from 'react-dom';

import App from './app.jsx';
import Landing from './landing.jsx';
render((
  <Router history={hashHistory}>
    <Route path='/' component={Landing} />
    <Route path='app' component={App} />
  </Router>
), document.getElementById('app'));
