require('dotenv').config({ path: 'variable.env' });
const express = require('express');
const cors = require('cors');
const authorizeSpotify = require('./authorizeSpotify');
const querystring = require("querystring");
const router = express.Router();
const app = express();
const spotify = require('./credentials');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get('/login', authorizeSpotify);

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
    res.redirect(`http://localhost:3000/Dashboard${query}`)
  });
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});