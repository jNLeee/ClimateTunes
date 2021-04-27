
// calculates rmse
function calcRMSE(attribArray, topTenArray) {
    var topTen = [];
    for (var i = 0; i < topTenArray.length; i++) {
        topTen.push([topTenArray[i][1], topTenArray[i][2], topTenArray[i][5], topTenArray[i][6], topTenArray[i][8]]);
    }

    const loudness = parseFloat(attribArray[2]) / (-60.0);
    attribArray[2] = 1 - loudness;
    var sum = 0;
    var RMSEsum = 0;
    var expression;
    for (var i = 0; i < topTenArray.length; i++) {
        for (var j = 0; j < 5; j++) {
            expression = topTen[i][j] - attribArray[j];
            sum += expression;
        }
        RMSEsum += Math.pow(sum, 2);
        sum = 0;
    }
    var finalRMSE = Math.sqrt((1.0/10) * RMSEsum);

    // alternate version of rmse calculation
    // const loudness = parseFloat(attribArray[2]) / (-60.0);
    // attribArray[2] = 1 - loudness;
    // var sum = 0;
    // var RMSEsum = 0;
    // var finalRMSE;
    // var expression;
    // for (var i = 0; i < topTenArray.length; i++) {
    //     for (var j = 0; j < 5; j++) {
    //         expression = Math.pow(topTen[i][j] - attribArray[j], 2);
    //         sum += expression;
    //         // console.log(expression);
    //     }

    //     // console.log(topTen[i][5]);
    //     // RMSEsum += Math.sqrt((1.0/10) * sum);
    //     // sum = 0;
    // }
    // finalRMSE = Math.sqrt((1.0/10) * sum);

    console.log(finalRMSE);
    return finalRMSE;
}

export default calcRMSE;