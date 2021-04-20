const spotify = require('./credentials');

const authorizeSpotify = (req, res) => {
    const scopes = "user-read-email user-read-private user-read-recently-played user-top-read playlist-modify-public playlist-modify-private user-follow-read user-library-read";

    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
    spotify.client_id
    }&redirect_uri=${encodeURI(
    spotify.redirect_uri
    )}&scope=${scopes}&show_dialog=true`;

    res.redirect(url);
};

module.exports = authorizeSpotify;