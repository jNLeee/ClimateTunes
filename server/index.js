require('dotenv').config({ path: 'variable.env' });

const express = require('express');
const request = require('request');
const cors = require('cors');
const Datastore = require('nedb');
const cron = require('node-cron');
const Pusher = require('pusher');
const authorizeSpotify = require('./authorizeSpotify');
const getAccessToken = require('./getAccessToken');

const clientUrl = process.env.CLIENT_URL;

const app = express();

const db = new Datastore();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get('/login', authorizeSpotify);
app.get('/callback', getAccessToken, (req, res, next) => {
  db.insert(req.credentials, err => {
    if (err) {
      next(err);
    } else {
      res.redirect(`${clientUrl}/Dashboard`);
    }
  });
});

// app.get('/callback', function(req, res) {
//   let code = req.query.code || null
//   let authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri: process.env.REDIRECT_URI,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (Buffer.from(
//         process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET, "base64"
//       ))
//     },
//     json: true
//   }
//   request.post(authOptions, function(error, response, body) {
//     var access_token = body.access_token
//     let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
//     res.redirect(uri + '/Dashboard?access_token=' + access_token)
//   })
// }) 

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});