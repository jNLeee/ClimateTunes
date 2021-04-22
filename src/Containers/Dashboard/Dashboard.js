import './Dashboard.css';
import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";

function Dashboard() {
  return (
    <div classname="Dashboard">
      <div classname="Navbar">
        <ReactBootStrap.Navbar className="color-nav" variant="dark" expand="lg">
          <ReactBootStrap.Navbar.Brand href="./Dashboard">Climate Tunes</ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto">
              <ReactBootStrap.Nav.Link href="./Dashboard">Home</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="../Help">Getting Started</ReactBootStrap.Nav.Link>
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
              This is the dashboard.
            </p>
            <ReactBootStrap.Figure>
              <ReactBootStrap.Figure.Image
                width={50}
                height={50}
                alt="50x50"
                src="./Assets/Breezy-bg.jpg"
              />
            </ReactBootStrap.Figure>
          </ReactBootStrap.Container>
        </ReactBootStrap.Jumbotron>
      </div>
      <div classname="Dropdown">
        <ReactBootStrap.DropdownButton id="dropdown-basic-button" title="Choose your current mood:">
          <ReactBootStrap.Dropdown.Item href="#/action-1">Sad</ReactBootStrap.Dropdown.Item>
          <ReactBootStrap.Dropdown.Item href="#/action-2">Happy</ReactBootStrap.Dropdown.Item>
          <ReactBootStrap.Dropdown.Item href="#/action-3">Mad</ReactBootStrap.Dropdown.Item>
        </ReactBootStrap.DropdownButton>
        <br></br>
        <ReactBootStrap.DropdownButton id="dropdown-basic-button" title="Select a music genre:">
          <ReactBootStrap.Dropdown.Item href="#/action-1">R&B</ReactBootStrap.Dropdown.Item>
          <ReactBootStrap.Dropdown.Item href="#/action-2">Hip-Hop</ReactBootStrap.Dropdown.Item>
          <ReactBootStrap.Dropdown.Item href="#/action-3">Pop</ReactBootStrap.Dropdown.Item>
        </ReactBootStrap.DropdownButton>
      </div>
    </div>
  );
}

export default Dashboard;