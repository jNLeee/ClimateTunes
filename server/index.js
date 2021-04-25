// require('dotenv').config({ path: 'variable.env' });
// const express = require('express');
// const cors = require('cors');
// const authorizeSpotify = require('./authorizeSpotify');
// const querystring = require("querystring");
// const router = express.Router();
// const app = express();
// const spotify = require('./credentials');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded());
// app.get('/login', authorizeSpotify);

// // helper function to encode data for token
// const encodeFormData = (data) => {
//   return Object.keys(data)
//     .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
//     .join('&');
// }

// // get token and redirect back to dashboard
// router.get('/Dashboard', async (req, res) => {
//   let body = {
//     grant_type: "authorization_code",
//     code: req.query.code,
//     redirect_uri: spotify.redirect_uri,
//     client_id: spotify.client_id,
//     client_secret: spotify.client_secret
//   }

//   await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Accept": "application/json"
//     },
//     body: encodeFormData(body)
//   })
//   .then(resp => resp.json())
//   .then(data => {
//     let query = querystring.stringify(data);
//     res.redirect(`http://localhost:3000/Dashboard${query}`)
//   });
// });

// app.set('port', process.env.PORT || 5000);
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });





// Christinas part
require('dotenv').config({ path: 'variable.env' });
const express = require('express');
const cors = require('cors');
const authorizeSpotify = require('./authorizeSpotify');
const querystring = require("querystring");
const router = express.Router();
const app = express();
const spotify = require('./credentials');
// var SpotifyWebApi = require('spotify-web-api-node');
const getAccessToken = require('./getAccessToken');
const Datastore = require('nedb');
const request = require('request');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get('/login', authorizeSpotify);

// initializing wrapper class
// var spotifyApi = new SpotifyWebApi({
//   clientId: spotify.client_id,
//   clientSecret: spotify.client_secret,
//   redirectUri: spotify.redirect_uri
// });

// helper function to encode data for token
const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

// get token and redirect back to dashboard
router.get('/Dashboard', async (req, res) => {
  let body = {
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: spotify.redirect_uri,
    client_id: spotify.client_id,
    client_secret: spotify.client_secret
  }

  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body: encodeFormData(body)
  })
  .then(resp => resp.json())
  .then(data => {
    let query = querystring.stringify(data);
    res.redirect(`http://localhost:3000/Dashboard?access_token=${query}`)
  });
});


// trying youtube video version
// app.get('/Dashboard', function(req, res) {
//   let code = req.query.code || null
//   let authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri: spotify.redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (Buffer.from(spotify.client_id + ':' + spotify.client_secret).toString('base64'))
//     },
//     json: true
//   }
//   request.post(authOptions, function(error, response, body) {
//     var access_token = body.access_token
//     res.redirect('')
//   })
// });



// trying pusher version again
// const db = new Datastore();

// app.get('/Dashboard', getAccessToken, (req, res, next) => {
//   db.insert(req.credentials, err => {
//     if (err) {
//       next(err);
//     } else {
//       res.redirect(`${spotify.client_url}/Dashboard?authorized=true&access_token=`);
//     }
//   });
// });





// attempting stuff here


// get token for current user this is wrapper class way
// app.get('/Dashboard', async (req, res) => {
//   var dashboardRedirectLink = 'http://localhost:3000/Dashboard?access_token='
//   const {code} = req.query;
//   var tokens = await spotifyApi.authorizationCodeGrant(code).then(
//     function(data) {
//       console.log("access token is " + data.body['access_token']);
//       //spotifyApi.setAccessToken(data.body['access_token']);
//     });
//   const {access_token, refresh_token} = tokens.body;
//   dashboardRedirectLink = dashboardRedirectLink + access_token
//   // spotifyApi.setAccessToken(access_token);
//   spotifyApi.setRefreshToken(refresh_token);
//   //res.redirect(`http://localhost:3000/Dashboard?access_token=${access_token}`)
//   res.redirect(dashboardRedirectLink);
// });

// router.get("/getUser/:token", async(req, res) => {
//   await fetch("https://api.spotify.com/v1/me", {
//     headers: {
//       "Authorization": `Bearer ${req.params.token}`
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     userID = data.id;
//     console.log("userID", userID);
//     res.json(data);
//   });
// });

// get list of current user's playlists



app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});