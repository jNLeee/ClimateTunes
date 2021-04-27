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
        currVector.push(currTrack.uri);

        userMatrix.push(currVector);
        // reset currVector
        currVector = [];
    }
    //console.log(userMatrix);

    return userMatrix;
}

export default calcMatrix;