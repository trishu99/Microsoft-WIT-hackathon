import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from "react-router-dom";
import React, { Component } from "react";
import "react-notifications/lib/notifications.css";

import Terminal from "./components/Commands/Commands";
import Share from "./components/Share/Share";
import Run from "./components/Run/Run";
import Notes from "./components/Notes/Notes";
import Health from "./components/Health/Health";
import TimeTable from "./components/TimeTable/TimeTable";
import Dora from "./components/Dora/Dora";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
    };
  }

  render() {
    console.log(this.state.time);
    return (
      <div>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/Terminal" component={Terminal} />
              <Route exact path="/Share" component={Share} />
              <Route exact path="/Run" component={Run} />
              <Route exact path="/Notes" component={Notes} />
              <Route exact path="/Health" component={Health} />
              <Route exact path="/TimeTable" component={TimeTable} />
              <Route exact path="/Dora" component={Dora} />

              <Redirect from="/" to="/Dora" />
            </Switch>
          </div>
        </Router>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </div>
    );
  }
}

export default App;
