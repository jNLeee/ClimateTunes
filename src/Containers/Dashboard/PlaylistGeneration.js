import calcMatrix from "./calcMatrix";

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

async function getTopFiftyTracksAudioFeatures(access_token, fiftyTrackIDs) {
    const accessToken = access_token;

    const id = fiftyTrackIDs;

    const api_call = await fetch(`https://api.spotify.com/v1/audio-features?ids=${id}`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const response = await api_call.json();

    return response.audio_features;
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
async function getTracksFromSeeds(access_token, topGenres, topArtists, temperature, weather_type, mood) {
    const accessToken = access_token;
    const genres = topGenres;
    const limit = 50;
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

    temp = Math.floor(Math.random() * 5);
    const topArtistID = topArtists.items[temp].id;
    const danceabilityArray = [0.8, 0.6, 0.25];  //[0.694, 0.6285, 0.551]; 
    var danceability = 0;
    const energyArray = [0.677, 0.5274, 0.513, 0.502];  
    var energy = 0;     
    const loudnessArray = [-8.953, -6.6405, -4.922];   
    var loudness = 0; 
    const speechinessArray = [0.2, 0.15, 0.05];     //[0.156, 0.110, 0.081];  
    var speechiness = 0;
    const valenceArray = [0.75, 0.5, 0.15]; //[0.669, 0.463, 0.329]; 
    var valence = 0;     

    //Checking Mood
    //console.log("mood: " + mood);
    mood = String(mood);
    switch(mood) {
        case "Happy":
            danceability = danceabilityArray[0];
            speechiness = speechinessArray[0];
            valence = valenceArray[0];
            break;
        case "Angry":
            danceability = danceabilityArray[1];
            speechiness = speechinessArray[1];
            valence = valenceArray[1];
            break;
        case "Sad":
            danceability = danceabilityArray[2];
            speechiness = speechinessArray[2];
            valence = valenceArray[2];
            break;
    }
    console.log("Danceability: " + danceability);
    console.log("Speechiness: " +  speechiness);
    console.log("Valence: " + valence);
    
    //Checking temperature and weather_type
    temperature = parseInt(temperature);
    // console.log(temperature);
    switch(true) {
        case temperature<60: 
            loudness = loudnessArray[0];
            break;
        case temperature>49 && temperature<76:
            loudness = loudnessArray[1];
            break;
        case temperature>75:
            loudness = loudnessArray[2];
            break;
        default: 
            loudness = loudnessArray[0];
    }

    // console.log("Temperature: " + temperature);
    // console.log("Loudness: " + loudness);

    switch(weather_type) {
        case weather_type == "Sun":
            energy = energyArray[0];
            break;
        case weather_type == "Cloud":
            energy = energyArray[1];
            break;
        case weather_type == "Rain":
            energy = energyArray[2];
            break;
        case weather_type == "Snow":
            energy = energyArray[3];
            break;
        default: 
            energy = energyArray[0];
    }
    // console.log("Energy: " + energy);
    // console.log("Weather_type: " + weather_type);

    const api_call = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&market=US&seed_artists=${topArtistID}&seed_genres=${seedGenres}&target_danceability=${danceability}&target_energy=${energy}&target_loudness=${loudness}&target_speechiness=${speechiness}&target_valence=${valence}`, {
        method: 'GET',
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const response = await api_call.json();
    console.log(response);
    //looping all 50 tracks and getting the ids
    var fiftyTrackIDs = "";
    for(var i = 0; i < 50; i++) {
        if(i != 49) {
            fiftyTrackIDs += (response.tracks[i].id + "%2C");
        } else {
            fiftyTrackIDs += (response.tracks[i].id);
        }
    }
    console.log(fiftyTrackIDs);
    return [response, fiftyTrackIDs];
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
async function generatePlaylist(access_token, temperature, weather_type, mood) {
    const accessToken = access_token;
    const topArtists = await getTopArtists(accessToken);
    const topGenres = await getTopGenres(topArtists);
    //const topTracks = await getTopTracks(accessToken);                                    // currently not using this but kept for just in case
    const tracksFromSeed = await getTracksFromSeeds(accessToken, topGenres, topArtists, temperature, weather_type, mood);


    const topFiftyTracks = await getTopFiftyTracksAudioFeatures(access_token, tracksFromSeed[1]);

    const builtMatrix = calcMatrix(topFiftyTracks);
    console.log(builtMatrix);
    // get current user id
    const userInfoCall = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const userInfo = await userInfoCall.json();
    const userID = userInfo.id;
    
    // create a playlist
    const playlistID = await createPlaylist(accessToken, userID, tracksFromSeed[0]);

    return playlistID;
}

export default generatePlaylist;