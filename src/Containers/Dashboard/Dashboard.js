import './Dashboard.css';
import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./Weather.js";
import City from "./City";
import Temp from "./Temp";
import Form from "./form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Cold from "./Assets/Cold-bg.jpg"
import Chilly from "./Assets/Chilly-bg.jpg"
import Breezy from "./Assets/Breezy-bg.jpg"
import Warm from "./Assets/Warm-bg.jpg"
import Hot from "./Assets/Hot-bg.jpg"
const querystring = require("querystring");

const API_key = "90336965ec56f27809bfa86f63e300fa";
var temp = 0;

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      //weather api
      city: undefined,
      country: undefined,
      clouds: undefined,
      visibility: undefined,
      temp: undefined,
      temp_max: undefined,
      temp_min: undefined,
      feels_like: undefined,
      wind: undefined,
      weather: "",
      icon: undefined,
      error: false,

      //spotify
      songName: undefined,
      danceability: undefined,
      tempo: undefined
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  componentDidMount() {
    let parsed = querystring.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log(parsed);
    fetch('https://api.spotify.com/v1/me', {
      headers: {"Authorization": 'Bearer ' + accessToken}
    })
      .then(response => response.json())
        .then(data => console.log(data))
    
    //get track data
    fetch('https://api.spotify.com/v1/tracks/6rPO02ozF3bM7NnOV4h6s2', {
      headers: {"Authorization": 'Bearer ' + accessToken}
    })
      .then(response => response.json())
        .then(data => this.setState({
          songName: data.name
        }))

    //get audio features data
    fetch('https://api.spotify.com/v1/audio-features/6rPO02ozF3bM7NnOV4h6s2', {
      headers: {"Authorization": 'Bearer ' + accessToken}
    })
      .then(response => response.json())
        .then(data => this.setState({
          danceability: data.danceability,
          tempo: data.tempo
        }))
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  convertToFar(temp) {
    let faren = Math.ceil((temp - 273.15) * (9/5) + 32)
    return faren;
  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;

    if(city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
      );
  
      const response = await api_call.json();
  
      console.log(response);
  
      this.setState( {
        city:`${response.name}`,
        country: response.sys.country,
        temp_celsius: this.convertToFar(response.main.temp),
        temp_max: this.convertToFar(response.main.temp_max),
        temp_min: this.convertToFar(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });
      temp = this.convertToFar(response.main.temp);

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
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
        <Row>
        <Col lg={3}>
        
          <div>
            <Form loadweather={this.getWeather} error={this.state.error}/>
          </div>
          
          
             
          <br></br>
      
          <div className="dropdown">
          <ReactBootStrap.Dropdown>
            <ReactBootStrap.Dropdown.Toggle class="dropdown-toggle" variant="btn-sm">
              Choose your mood:
            </ReactBootStrap.Dropdown.Toggle>

            <ReactBootStrap.Dropdown.Menu>
              <ReactBootStrap.Dropdown.Item href="#/action-1">Happy</ReactBootStrap.Dropdown.Item>
              <ReactBootStrap.Dropdown.Item href="#/action-2">Sad</ReactBootStrap.Dropdown.Item>
              <ReactBootStrap.Dropdown.Item href="#/action-3">Angry</ReactBootStrap.Dropdown.Item>
            </ReactBootStrap.Dropdown.Menu>
        </ReactBootStrap.Dropdown>
          </div>
          
          <br></br>
          
        
        </Col>
        <Col lg>
          <div className=
            {temp>90 ? 'jumbotron hot' : 
              (temp>75 ? 'jumbotron warm' :
                (temp>60 ? 'jumbotron breezy' :
                  (temp>32 ? 'jumbotron chilly' :
                    (temp<33 ? 'jumbotron cold' :
                      'jumbotron'
                    )
                  )
                )
              )
            }>


            <div className="row">
              <div className="city">
                <City
                  city={this.state.city} 
                />
              </div>
              <div className="weather">
                <Weather 
                  city={this.state.city} 
                  country={this.state.country}
                  temp_celsius={this.state.temp_celsius}
                  temp_max={this.state.temp_max}
                  temp_min={this.state.temp_min}
                  description={this.state.description}
                  weatherIcon={this.state.icon}
                />
              </div>
              <div className="temperature">
                <Temp
                  temp_celsius={this.state.temp_celsius}
                  temp_max={this.state.temp_max}
                  temp_min={this.state.temp_min}
                />
              </div>
            </div>
          </div>

          <div className="top-tracks">
            <h4>Top Recommended Tracks</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Time</th>
                </tr>
              </thead>
              {/* <tbody>{musicHistory.map((e, index) => TableItem(e, index))}</tbody> */}
              <h1>Song Name = {this.state.songName}</h1>
              <h1>Danceability = {this.state.danceability}</h1>
              <h1>Tempo = {this.state.tempo}</h1>
            </table>
          </div>
        </Col>
        </Row>
        
      </div>
    );
  }
}


export default Dashboard;