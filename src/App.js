import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HomePage from './containers/HomePage';
import RegisterPage from './containers/RegisterPage';
import LoginPage from './containers/LoginPage';
import NewRequestPage from './containers/NewRequestPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"  component={HomePage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/newrequest" component={NewRequestPage}/>
      </Switch>
    </Router>
  );
}

export default App;
