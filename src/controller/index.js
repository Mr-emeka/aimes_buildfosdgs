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

  const input = {
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
  const { data, impact, severeImpact } = covid19ImpactEstimator(input);


  if (request.url.includes('xml') || request.headers['content-type'] === 'application/xml') {
    return new XMLResponse(201, {
      error: false,
      message: {
        data,
        impact,
        severeImpact

      }
    });
  }
  return new Response(201, {
    error: false,
    message: {
      data,
      impact,
      severeImpact
    }
  });
};
