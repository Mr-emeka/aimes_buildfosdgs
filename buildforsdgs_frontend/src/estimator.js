const formatDate = (periodType) => {
  let days;
  if (/week/i.test(periodType)) {
      const value = periodType.split(' ');
      days = parseInt(value[0], 10) * 7;
  }
  if (/month/i.test(periodType)) {
      const value = periodType.split(' ');
      days = parseInt(value[0], 10) * 30;
  }
  if (/day/i.test(periodType)) {
      const value = periodType.split(' ');
      days = parseInt(value[0], 10);
  }
  return days;
};
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  const days = formatDate(data.periodType);

  const requestedTime = Math.floor(days / 3);

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** requestedTime);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** requestedTime);

  // challenge 2
  impact.severeCasesByRequestedTime = (15 / 100) * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = (15 / 100) * severeImpact.infectionsByRequestedTime;

  impact.totalHospitalBedsByRequestedTime = Math.trunc((35 * 100) * data.totalHospitalBeds - impact.severeCasesByRequestedTime);
  severeImpact.totalHospitalBedsByRequestedTime = Math.trunc((35 * 100) * data.totalHospitalBeds - severeImpact.severeCasesByRequestedTime);

  // Challenge 3
  impact.casesForICUByRequestedTime = Math.trunc((5 * 100) * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.trunc((5 * 100) * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = Math.trunc((2 * 100) * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc((2 * 100) * severeImpact.infectionsByRequestedTime);

  impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / days);
  severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / days);
  return {
      data,
      impact,
      severeImpact
  };
}

export default covid19ImpactEstimator;