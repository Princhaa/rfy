import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Profile from './pages/Profile';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component = {Home}/>
          <Route exact path='/profile' component = {Profile}/>
          <Route exact path='/dashboard' component = {Dashboard}/>
        </div>
      </Router>
    );
  }
}

export default App;
