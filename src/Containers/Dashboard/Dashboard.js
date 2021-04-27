import './Dashboard.css';
import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./Weather.js";
import City from "./City";
import Temp from "./Temp";
import Form from "./form";
import Search from "./Search";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Cold from "./Assets/Cold-bg.jpg"
import Chilly from "./Assets/Chilly-bg.jpg"
import Breezy from "./Assets/Breezy-bg.jpg"
import Warm from "./Assets/Warm-bg.jpg"
import Hot from "./Assets/Hot-bg.jpg"
import generatePlaylist from "./PlaylistGeneration";
const querystring = require("querystring");

const API_key = "90336965ec56f27809bfa86f63e300fa";
var temp = 0;

const bgImage = [
  "",
  Cold,
  Chilly,
  Breezy,
  Warm,
  Hot,
];

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      //weather api
      city: undefined,
      country: undefined,
      clouds: undefined,
      visibility: undefined,
      humidity: undefined,
      temp: undefined,
      temp_max: undefined,
      temp_min: undefined,
      feels_like: undefined,
      wind: undefined,
      speed: undefined,
      weather: "",
      icon: undefined,
      weatherType: undefined,
      error: false,

      //spotify
      songName: undefined,
      artistName: undefined,
      trackID: undefined,
      acousticness: undefined,
      danceability: undefined,
      energy: undefined,
      instrumentalness: undefined,
      liveness: undefined,
      loudness: undefined,
      speechiness: undefined,
      tempo: undefined,
      valence: undefined,
      playlists_id: undefined,
      playlist_link: undefined
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

  // componentDidMount() {
  //   let parsed = querystring.parse(window.location.search);
  //   let accessToken = parsed.access_token;
  //   console.log(parsed);
    
  //   generatePlaylist(accessToken)
  //     .then(data => this.setState({
  //       playlist_id: data
  //     }))
  // }

  generatePlaylistLink(id) {
    var playlist_link = "https://open.spotify.com/embed/playlist/" + String(id);
    return playlist_link;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm, weatherType: "Rain" });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle, weatherType: "Rain" });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain, weatherType: "Rain" });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow, weatherType: "Snow" });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere, weatherType: "Sun" });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear, weatherType: "Sun" });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds, weatherType: "Cloud" });
        break;
      default:
        this.setState({ icon: icons.Clouds, weatherType: "Cloud" });
    }
  }

  convertToFar(temp) {
    let faren = Math.ceil((temp - 273.15) * (9/5) + 32)
    return faren;
  }

  getSpotify = async (e) => {
    e.preventDefault();

    let parsed = querystring.parse(window.location.search);
    let accessToken = parsed.access_token;

    const song = e.target.elements.song.value;
    const artist = e.target.elements.artist.value;

    if(song) {
      const api_call = await fetch(`https://api.spotify.com/v1/search?q=${song}%20${artist}&type=track`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
      });

      const response = await api_call.json();
  
      console.log(response);

      this.setState( {
        trackID: response.tracks.items[0].id,
        songName: response.tracks.items[0].name,
        artistName: response.tracks.items[0].artists[0].name,
        error: false
      });
    } else {
      this.setState({
        error: true
      });
    }

    const trackID = this.state.trackID;
    if(trackID) {
      const api_call = await fetch(`https://api.spotify.com/v1/audio-features/${trackID}`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
      });

      const response = await api_call.json();
  
      console.log(response);

      this.setState( {
        acousticness: response.acousticness,
        danceability: response.danceability,
        energy: response.energy,
        instrumentalness: response.instrumentalness,
        liveness: response.liveness,
        loudness: response.loudness,
        speechiness: response.speechiness,
        tempo: response.tempo,
        valence: response.valence,
        error: false
      });
    } else {
      this.setState({
        error: true
      });
    }
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
        temp: this.convertToFar(response.main.temp),
        temp_max: this.convertToFar(response.main.temp_max),
        temp_min: this.convertToFar(response.main.temp_min),
        visibility: response.visibility,
        humidity: response.main.humidity,
        speed: response.wind.speed,
        description: response.weather[0].description,
        error: false
      });
      const temperature = this.state.temp;
      const weatherType = this.state.weatherType;

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      //wait for weather then display playlist
      let parsed = querystring.parse(window.location.search);
      let accessToken = parsed.access_token;
      console.log(parsed);
      
      generatePlaylist(accessToken, temp, weatherType)
        .then(data => this.setState({
          playlist_id: data
        }))
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <body>
        <div classname="Navbar">
        <ReactBootStrap.Navbar className="color-nav" variant="dark" expand="lg">
            <ReactBootStrap.Navbar.Brand href="./Dashboard">Climate Tunes</ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
              <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.Nav.Link href="./Dashboard">Home</ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link href="../Help">Getting Started</ReactBootStrap.Nav.Link>
              </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
          </ReactBootStrap.Navbar>
        </div>
        <Row className="main-row">
        <Col className="input-column" xl={2}>
        
          
            <Form loadweather={this.getWeather} error={this.state.error}/>
          
          
          
             
          <br></br>
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
        <Col xl>
          <div className=
            {this.state.temp>90 ? 'jumbotron hot' : 
              (this.state.temp>75 ? 'jumbotron warm' :
                (this.state.temp>60 ? 'jumbotron breezy' :
                  (this.state.temp>32 ? 'jumbotron chilly' :
                    (this.state.temp<33 ? 'jumbotron cold' :
                      'jumbotron'
                    )
                  )
                )
              )
            }>

            
            <div>
              <Row>
                <Col lg>
                  <div className="city">
                    <City
                      city={this.state.city} 
                    />
                  </div>
                  <div className="weather">
                    <Weather 
                      city={this.state.city} 
                      country={this.state.country}
                      temp={this.state.temp}
                      temp_max={this.state.temp_max}
                      temp_min={this.state.temp_min}
                      description={this.state.description}
                      weatherIcon={this.state.icon}
                    />
                  </div>
                </Col>
                <Col className="jumbo-right" lg>
                  <div className="temperature">
                  <Temp
                    temp={this.state.temp}
                    temp_max={this.state.temp_max}
                    temp_min={this.state.temp_min}
                    visibility={this.state.visibility}
                    humidity={this.state.humidity}
                    speed={this.state.speed}
                  />
                </div>
                </Col>
              </Row>
              
              
            </div>
          </div>

          <div className="top-tracks">
            <h4>Top Recommended Tracks</h4>
            <div className="spotify-player"> 
            <iframe src={this.generatePlaylistLink(this.state.playlist_id)} width="100%" height="500px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>


            {/* <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Time</th>
                </tr>
              </thead> */}
              {/* <tbody>{musicHistory.map((e, index) => TableItem(e, index))}</tbody> */}
        
              {/* <div>
                <Search searchsong={this.getSpotify} error={this.state.error}/>
              </div>
              
              <h5>Song Name = {this.state.songName}</h5>
              <h5>Artist Name = {this.state.artistName}</h5>
              <h5>TrackID = {this.state.trackID}</h5>
              <h5>Acousticness = {this.state.acousticness}</h5>
              <h5>Danceability = {this.state.danceability}</h5>
              <h5>Energy = {this.state.energy}</h5>
              <h5>Instrumentalness = {this.state.instrumentalness}</h5>
              <h5>Liveness = {this.state.liveness}</h5>
              <h5>Loudness = {this.state.loudness}</h5>
              <h5>Speechiness = {this.state.speechiness}</h5>
              <h5>Tempo = {this.state.tempo}</h5>
              <h5>Valence = {this.state.valence}</h5>  */}


            {/* {/* </table> */}
          </div>
        </Col>
        </Row>
        
      </body>
    );
  }
}

export default Dashboard;