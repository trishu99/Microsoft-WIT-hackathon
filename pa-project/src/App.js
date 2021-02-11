import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import React, { Component } from "react";

import axios from 'axios';
import Terminal from './components/Commands/Commands';
import Share from './components/Share/Share';
import Run from './components/Run/Run';
import Notes from './components/Notes/Notes';
import Header from './components/Header'; 



class App extends Component{
  render(){
  return (
    <div>	
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/Terminal" component={Terminal} />
        <Route exact path = "/Share" component = {Share} />
        <Route exact path = "/Run" component = {Run} />	
        <Route exact path = "/Notes" component = {Notes} />	

          
        <Redirect from="/" to="/Terminal" />
      </Switch>
      </div>
    </Router>	
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
  </div>	
  );
}
}

export default App;
