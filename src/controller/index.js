const { Response, XMLResponse } = require('../utils');
const covid19ImpactEstimator = require('../estimator');


const estimate = async (request) => {
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

  return new Response(201, {
    // error: false,
    data,
    impact,
    severeImpact
  });
};
const estimateforXml = async (request) => {
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

  return new XMLResponse(201, {
    // error: false,
    data,
    impact,
    severeImpact

  });
};

const estimateforJson = async (request) => {
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
  return new Response(201, {
    // error: false,
    data,
    impact,
    severeImpact

  });
};

module.exports = {
  estimate,
  estimateforJson,
  estimateforXml
};
