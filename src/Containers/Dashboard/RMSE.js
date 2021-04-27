
function calcRMSE(attribArray, topTenArray) {
    // r = 0
    // c = 0
    // sumRMSE = 0
    // numPredictions = 0

    // # calculate RMSE sum
    // for row in test_mat:
    //     for item in row:
    //         if (item != 0):
    //             numPredictions += 1
    //             expression = (prediction_mat[r][c] - item) ** 2
    //             sumRMSE += expression
    //         c += 1
    //     c = 0
    //     r += 1            

    // finalRMSE = math.sqrt((1.0 / numPredictions) * sumRMSE)

    var topTen = [];
    for (var i = 0; i < topTenArray.length; i++) {
        topTen.push([topTenArray[i][1], topTenArray[i][2], topTenArray[i][5], topTenArray[i][6], parseFloat(topTenArray[i][8])]);
        // console.log("topTenArray[i][8]");
        // console.log(typeof topTenArray[i][8]);
    }
    console.log(topTen);


    const loudness = parseFloat(attribArray[2]) / (-60.0);
    attribArray[2] = 1 - loudness;
    var sum = 0;
    var RMSEsum = 0;
    var finalRMSE;
    var expression;
    for (var i = 0; i < topTenArray.length; i++) {
        for (var j = 0; j < 5; j++) {
            expression = topTen[i][j] - attribArray[j];
            sum += expression;
            // console.log(expression);
        }

        // console.log(topTen[i][5]);
        RMSEsum += Math.pow(sum, 2);
        sum = 0;
    }
    finalRMSE = Math.sqrt((1.0/10) * RMSEsum);


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
}

export default calcRMSE;