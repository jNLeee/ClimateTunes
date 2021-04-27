
// calculate euclidean similarity between user profile and matrix 
function calcEuclidean(userProfile, builtMatrix) {
    var sum = 0;
    var similar;
    var simArray = [];
    for(var i = 0; i < 50; i++) {
        for(var j = 0; j < 9; j++) {
            sum += Math.pow(userProfile[j] - builtMatrix[i][j], 2);
        }
        similar = Math.sqrt(sum);
        simArray.push(similar);
        sum = 0;
    }

    return simArray;
}

// get top ten most similar songs based on euclidean similarity
function getTopTen(simArray, builtMatrix) {
    var index;
    var topTen = "";
    var topTenArray = [];
    for(var i = 0; i < 10; i++) {
        index = simArray.indexOf(Math.min(...simArray));
        simArray[index] = 1000000;
        topTenArray.push(builtMatrix[index]);

        if(i != 9) {
            topTen += builtMatrix[index][9] + "%2C";
        } else {
            topTen += builtMatrix[index][9];
        }
    }

    return [topTen, topTenArray];
}

function euclideanSimilarity(userProfile, builtMatrix) {
    const simArray = calcEuclidean(userProfile, builtMatrix);
    const topTen = getTopTen(simArray, builtMatrix);

    return topTen;
}

export default euclideanSimilarity;