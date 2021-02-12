import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import React, { Component } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';




import axios from 'axios';
import Terminal from './components/Commands/Commands';
import Share from './components/Share/Share';
import Run from './components/Run/Run';
import Notes from './components/Notes/Notes';
import Health from './components/Health/Health';
import TimeTable from './components/TimeTable/TimeTable';
import Dora from './components/Dora/Dora';


import Header from './components/Header'; 



class App extends Component{
  
	constructor(props) {
    super(props);
    this.state ={
    time : ''
    };
  }

  createNotification = (type) => {
    return () => {
      console.log("functon called")
      switch (type) {
        case 'water':
          NotificationManager.info('Drink Water','', 1000);
          break;
        case 'eat':
          NotificationManager.info('Eat Something healthy','', 1000);
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };

  createReminders = () => {
    console.log("inside reminders")
    this.createNotification('water')
  }

  componentDidMount() {

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }



  render(){
    console.log(this.state.time)
  return (
    <div>	
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/Terminal" component={Terminal} />
        <Route exact path = "/Share" component = {Share} />
        <Route exact path = "/Run" component = {Run} />	
        <Route exact path = "/Notes" component = {Notes} />	
        <Route exact path = "/Health" component = {Health} />	
        <Route exact path = "/TimeTable" component = {TimeTable} />	
        <Route exact path = "/Dora" component = {Dora} />	

          
        <Redirect from="/" to="/Dora" />
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
