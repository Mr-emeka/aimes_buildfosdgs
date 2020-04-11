const { ResponseError, Response, xmlResponse } = require("../utils")
const covid19ImpactEstimator = require('../estimator');


module.exports = async request => {
    console.log(request.body);
    const {
        region,
        periodType,
        timeToElapse,
        reportedCases,
        population,
        totalHospitalBeds
    } = request.body;
    const {
        name,
        avgAge,
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
    } = region;

    const data = {
        region: {
            name,
            avgAge,
            avgDailyIncomeInUSD,
            avgDailyIncomePopulation
        },
        periodType,
        timeToElapse,
        reportedCases,
        population,
        totalHospitalBeds
    };

    const result = covid19ImpactEstimator(data);

    if (request.headers['content-type'] === 'application/xml') {
        return new xmlResponse(201, {
            error: false,
            message: result
        });
    }
    return new Response(201, {
        error: false,
        message: result
    })
}
