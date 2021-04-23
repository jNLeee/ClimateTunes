import './Help.css';
import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function Help() {
  return (
    <div classname="Help">
      <div classname="Navbar">
        <ReactBootStrap.Navbar className="color-nav" variant="dark" expand="lg">
          <ReactBootStrap.Navbar.Brand href="../Dashboard">Climate Tunes</ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto">
              <ReactBootStrap.Nav.Link href="../Dashboard">Home</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="./Help">Getting Started</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="#settings">Settings</ReactBootStrap.Nav.Link>
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
      </div>
      <br></br>
      <div classname="Jumbotron">
        <ReactBootStrap.Jumbotron fluid>
          <ReactBootStrap.Container>
            <ReactBootStrap.Form inline>
              <ReactBootStrap.FormControl type="text" placeholder="Find your location:" className="mr-sm-2" />
              <ReactBootStrap.Button variant="outline-primary">Search</ReactBootStrap.Button>
            </ReactBootStrap.Form>
            <p>
              This will display all the weather information in your area.
            </p>
            <p>
              This is the Help Page.
            </p>
          </ReactBootStrap.Container>
        </ReactBootStrap.Jumbotron>
      </div>
    </div>
  );
}

export default Help;