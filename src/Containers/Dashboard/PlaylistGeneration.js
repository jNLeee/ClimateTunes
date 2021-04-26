
// get user's top 5 artists
async function getTopArtists(access_token) {
    const accessToken = access_token;
    const type = "artists";
    const limit = 5;

    const api_call = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const response = await api_call.json();

    return response;
}

// get user's top 5 tracks                                                                          <-- currently not using this but kept it just in case
async function getTopTracks(access_token) {
    const accessToken = access_token;
    const type = "tracks";
    const limit = 5;

    const api_call = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const response = await api_call.json();

    return response;
}

// get user's top genres based on top artist data
function getTopGenres(data) {
    var topGenres = [];
    for (var i = 0; i < Object.keys(data.items).length; i++) {
        for (var j = 0; j < Object.keys(data.items[i].genres).length; j++)
            topGenres.push(data.items[i].genres[j]);
    }
    console.log(topGenres);
    return topGenres;
}

// get a list of recommended tracks based on given top genre seeds
async function getTracksFromSeeds(access_token, topGenres, topArtists, temperature, weather_type) {
    const accessToken = access_token;
    const genres = topGenres;
    const limit = 10;
    var temp = 0;
    var seedGenres = "";
    for (var i = 0; i < 4; i++){
        var numGenres = genres.length;
        temp = Math.floor(Math.random() * numGenres);
        seedGenres += genres[temp];
        genres.splice(temp, 1);
        if (i != 3) {
            seedGenres += "%2C";         
        }
    }
    // clean up string values
    seedGenres = seedGenres.replace(/ /g, "-");        
    seedGenres = seedGenres.replace('&', "-n-");        // rock & roll  ->  rock--n--roll ??

    const topArtistID = topArtists.items[0].id;
    const danceability = [0.694, 0.6285, 0.551]; 
    const energy = [0.677, 0.5274, 0.513, 0.502];       
    const loudness = [-8.953, -6.6405, -4.922];    
    const speechiness = [0.156, 0.110, 0.081];  
    const valence = [0.669, 0.463, 0.329];      
    
    //Checking temperature and weather_type
    


    const api_call = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&market=US&seed_artists=${topArtistID}&seed_genres=${seedGenres}&target_danceability=${danceability[0]}&target_energy=${energy[0]}&target_loudness=${loudness[0]}&target_speechiness=${speechiness[0]}&target_valence=${valence[0]}`, {
        method: 'GET',
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const response = await api_call.json();
    console.log(response);
    return response;
}

// create a playlist and add tracks to the playlist. returns playlist id
async function createPlaylist(access_token, user_id, tracksData) {
    const accessToken = access_token;
    const userID = user_id;
    const dataFromTracks = tracksData;

    const makePlaylist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'POST',
        body: JSON.stringify({
            'name': 'ClimateTunes Playlist', 
            'description': 'a personalized, ranked playlist based on your location and mood!',
            'public': false,
        }),
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const playlist = await makePlaylist.json();
    const playlistID = playlist.id;

    // add tracks from seed to playlist
    var trackURIs = "";
    for (var i = 0; i < Object.keys(dataFromTracks.tracks).length; i++){
        trackURIs += dataFromTracks.tracks[i].uri;
        if (i != Object.keys(dataFromTracks.tracks).length - 1) {
            trackURIs += "%2C";
        }
    }

    const addTracks = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${trackURIs}`, {
        method: 'POST',    
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const response = await addTracks.json();
   
    return playlistID;
}

// generate a playlist given restrictions with consideration of user's top genres
async function generatePlaylist(access_token, temp, weatherType) {
    const accessToken = access_token;
    const topArtists = await getTopArtists(accessToken);
    const topGenres = await getTopGenres(topArtists);

    const temperature = temp;
    const weather_type = weatherType;
    //const topTracks = await getTopTracks(accessToken);                                    // currently not using this but kept for just in case
    const tracksFromSeed = await getTracksFromSeeds(accessToken, topGenres, topArtists, temperature, weather_type);

    // get current user id
    const userInfoCall = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const userInfo = await userInfoCall.json();
    const userID = userInfo.id;
    
    // create a playlist
    const playlistID = await createPlaylist(accessToken, userID, tracksFromSeed);

    return playlistID;
}

export default generatePlaylist;