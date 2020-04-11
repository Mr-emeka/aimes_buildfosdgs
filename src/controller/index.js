const { Response, XMLResponse } = require('../utils');
const covid19ImpactEstimator = require('../estimator');


module.exports = async (request) => {
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
    return new XMLResponse(201, {
      error: false,
      message: result
    });
  }
  return new Response(201, {
    error: false,
    message: result
  });
};
