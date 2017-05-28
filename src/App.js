import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Profile from './pages/Profile';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import store from './service/store';

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/dashboard' component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
