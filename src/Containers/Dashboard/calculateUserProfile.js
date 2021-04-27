
// get user's top 50 tracks                                                                          <-- currently not using this but kept it just in case
async function getTopTracks(access_token) {
    const accessToken = access_token;
    const type = "tracks";
    const limit = 50;

    const api_call = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
    });
    const response = await api_call.json();
    //console.log(response.items);
    const itemsArray = response.items;

    return itemsArray;
}

// takes top tracks data and gets the audio features for all songs
async function getAudioFeatures(access_token, tracksData) {
    const accessToken = access_token;
    var trackIDs = "";
    //console.log(tracksData);
    
    var itemsArray = tracksData;
    for (var i = 0; i < Object.keys(itemsArray).length; i++) {
        trackIDs += itemsArray[i].id;
        if (i != Object.keys(itemsArray).length - 1) {
            trackIDs += "%2C";
        }
    }
    //console.log(trackIDs);

    // get array of all audio features for tracks
    const getAudioFeatures = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIDs}`, {
        headers: {"Authorization": 'Bearer ' + accessToken}
      });
    const audioFeatures = await getAudioFeatures.json();
    //console.log(audioFeatures.audio_features);

    const audioFeaturesArray = audioFeatures.audio_features;

    return audioFeaturesArray;
}

// given array of all audio features in json, make a 2d array with all values
function calcMatrix(audioFeaturesArray) {
    var userMatrix = [];
    var currVector = [];
    var currTrack = undefined;
    var loudness = 0;
    var tempo = 0;
    //console.log(audioFeaturesArray);

    for (var i = 0; i < Object.keys(audioFeaturesArray).length; i++) {
        currTrack = audioFeaturesArray[i];
        currVector.push(currTrack.acousticness);
        currVector.push(currTrack.danceability);
        currVector.push(currTrack.energy);
        currVector.push(currTrack.instrumentalness);
        currVector.push(currTrack.liveness);
        loudness = currTrack.loudness / (-60.0);
        currVector.push(loudness);
        currVector.push(currTrack.speechiness);
        tempo = 1.0 - (60.0 / currTrack.tempo);
        currVector.push(tempo);
        currVector.push(currTrack.valence);

        userMatrix.push(currVector);
        // reset currVector
        currVector = [];
    }
    //console.log(userMatrix);

    return userMatrix;
}

// calculate user vector by averaging matrix values
function calcUserProfile(userMatrix) {
    var finalArray = [];
    var currFeature = 0;
    var avg = 0;

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 50; j++) {
            currFeature += userMatrix[j][i];
        }
        avg = currFeature / 50.0;
        finalArray.push(avg);
        currFeature = 0;
    }
    //console.log(finalArray);

    return finalArray;
}

// generate a vector of averaged audio features for current user
async function generateUserProfileVector(access_token) {
    const accessToken = access_token;

    const top50tracks = await getTopTracks(accessToken);
    const audioFeaturesArray = await getAudioFeatures(accessToken, top50tracks);
    const userMatrix = calcMatrix(audioFeaturesArray);
    const userVector = calcUserProfile(userMatrix);

    return userVector;
}

export default generateUserProfileVector;