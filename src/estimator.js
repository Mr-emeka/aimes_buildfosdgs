// Input data structured as
/* {
    region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
} */

// Output data structured as
/*
{
    data: {}, // the input data you got
    impact: {}, // your best case estimation
    severeImpact: {} // your severe case estimation
}
*/
const formatDate = (periodType, timeToElapse) => {
  let days; let requestedTime;
  switch (periodType) {
    case 'days':
      days = timeToElapse;
      requestedTime = Math.trunc(days / 3);
      break;
    case 'weeks':
      days = timeToElapse * 7;
      requestedTime = Math.floor(days / 3);
      break;
    case 'months':
      days = timeToElapse * 30;
      requestedTime = Math.floor(days / 3);
      break;
    default:
      days = timeToElapse;
      requestedTime = Math.floor(days / 3);
      break;
  }
  return { days, requestedTime };
};

const infectionProjections = (currentlyInfected, requestedTime) => {
  const projection = currentlyInfected * (2 ** requestedTime);
  return projection;
};
const availableBeds = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const occupied = 0.65 * totalHospitalBeds;
  const available = totalHospitalBeds - occupied;
  return Math.trunc(available - severeCasesByRequestedTime);
};
const caldollarInflight = (infectionsByRequestedTime, percentageIncome, avgIncome, days) => {
  const estimatedLoss = (infectionsByRequestedTime * percentageIncome * avgIncome) / days;
  return Math.floor(estimatedLoss);
};

const doMath = ({
  reportedCases,
  totalHospitalBeds,
  periodType,
  timeToElapse,
  region
}, reportedCasesMultiplyer) => {
  const { days, requestedTime } = formatDate(periodType, timeToElapse);
  const currentlyInfected = reportedCases * reportedCasesMultiplyer;
  const infectionsByRequestedTime = infectionProjections(currentlyInfected, requestedTime);
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime: availableBeds(totalHospitalBeds, severeCasesByRequestedTime),
    casesForICUByRequestedTime: Math.floor(0.05 * infectionsByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.floor(0.02 * infectionsByRequestedTime),
    dollarsInFlight: caldollarInflight(
      infectionsByRequestedTime,
      region.avgDailyIncomePopulation,
      region.avgDailyIncomeInUSD,
      days
    )
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: doMath(data, 10),
  severeImpact: doMath(data, 50)
});

// export default covid19ImpactEstimator;
module.exports = covid19ImpactEstimator;
