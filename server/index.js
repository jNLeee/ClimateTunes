require('dotenv').config({ path: 'variables.env' });

const express = require('express');
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
      res.redirect(`${clientUrl}/?authorized=true`);
    }
  });
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});