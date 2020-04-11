const formatDate = (periodType, timeToElapse) => {
  let days; let requestedTime;
  if (/week/i.test(periodType)) {
    days = timeToElapse * 7;
    requestedTime = Math.trunc((timeToElapse * 7) / 3);
  }
  if (/month/i.test(periodType)) {
    days = timeToElapse * 30;
    requestedTime = Math.trunc((timeToElapse * 30) / 3);
  }
  if (/days/i.test(periodType)) {
    days = timeToElapse;
    requestedTime = Math.trunc(timeToElapse / 3);
  }
  return { days, requestedTime };
};
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  const { days, requestedTime } = formatDate(data.periodType, data.timeToElapse);

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** requestedTime);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** requestedTime);

  // challenge 2
  impact.severeCasesByRequestedTime = (15 / 100) * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = (15 / 100) * severeImpact.infectionsByRequestedTime;

  impact.hospitalBedsByRequestedTime = Math.trunc((35 / 100) * data.totalHospitalBeds - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc((35 / 100) * data.totalHospitalBeds - severeImpact.severeCasesByRequestedTime);

  // Challenge 3
  impact.casesForICUByRequestedTime = Math.trunc((5 / 100) * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.trunc((5 / 100) * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * severeImpact.infectionsByRequestedTime);

  impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / days);
  severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / days);
  return {
    data,
    impact,
    severeImpact
  };
};

// export default covid19ImpactEstimator;
module.exports = covid19ImpactEstimator;
