import React, { Component } from "react";
import Header from "../Header";
import { Container, Row, Col } from "react-grid-system";
import terminal from "../../assets/terminal.jpg";
import health from "../../assets/health.jpg";
import notes from "../../assets/notes.jpg";
import run from "../../assets/run.jpg";
import share from "../../assets/share.jpeg";
import timetable from "../../assets/timetable.jpg";

import "./Dora.css";

import { Link } from "react-router-dom";

export class Dora extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className="features">
          <Container>
            <Row>
              <Col sm={4}>
                <Link to="/Terminal" className="nav-item nav-link">
                  <img src={terminal} height="200" width="300" alt="terminal" />
                </Link>
              </Col>
              <Col sm={4}>
                <Link to="/Share" className="nav-item nav-link">
                  <img src={share} height="200" width="300" alt="share" />
                </Link>
              </Col>
              <Col sm={4}>
                <Link to="/Run" className="nav-item nav-link">
                  <img src={run} height="200" width="300" alt="run" />
                </Link>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Link to="/Notes" className="nav-item nav-link">
                  <img src={notes} height="200" width="300" alt="notes" />
                </Link>
              </Col>
              <Col sm={4}>
                <Link to="/Health" className="nav-item nav-link">
                  <img src={health} height="200" width="300" alt="health" />
                </Link>
              </Col>
              <Col sm={4}>
                <Link to="/TimeTable" className="nav-item nav-link">
                  <img
                    src={timetable}
                    height="200"
                    width="300"
                    alt="timetable"
                  />
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Dora;
