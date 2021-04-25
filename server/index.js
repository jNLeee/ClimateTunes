require('dotenv').config({ path: 'variable.env' });
const express = require('express');
const cors = require('cors');
const authorizeSpotify = require('./authorizeSpotify');
const querystring = require("querystring");
const router = express.Router();
const app = express();
const spotify = require('./credentials');
var SpotifyWebApi = require('spotify-web-api-node');
const getAccessToken = require('./getAccessToken');
const Datastore = require('nedb');
const request = require('request');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get('/login', authorizeSpotify);

// initializing wrapper class
var spotifyApi = new SpotifyWebApi({
  clientId: spotify.client_id,
  clientSecret: spotify.client_secret,
  redirectUri: spotify.redirect_uri
});

// get token for current user this is wrapper class way
app.get('/callback', async (req, res) => {
  var dashboardRedirectLink = 'http://localhost:3000/Dashboard?&access_token='
  const {code} = req.query;
  var tokens = await spotifyApi.authorizationCodeGrant(code);
  const {access_token, refresh_token} = tokens.body;
  dashboardRedirectLink = dashboardRedirectLink + access_token
  spotifyApi.setAccessToken(access_token);
  spotifyApi.setRefreshToken(refresh_token);
  //res.redirect(`http://localhost:3000/Dashboard?access_token=${access_token}`)
  res.redirect(dashboardRedirectLink);
});


// example code
// app.get('/api/genres_of_artists', async (req, res) => { 
//   var genres = []
//   spotifyApi.getMyTopArtists()
//   .then(function(data) {
//     // loops through spotify's response and makes a list of the genres
//     for(var artist in data.body.items){
//       for(var genre in data.body.items[artist]['genres']){
//         genres.push(data.body.items[artist]['genres'][genre]);
//       }
//     }
//     console.log(genres);
//     // the response is the list of genres
//     res.send(genres);
//   }, function(err) {
//     console.log('ERROR WITH GETTING TOP ARISTS', err);
//   });
// });

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});