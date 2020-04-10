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
}

export default covid19ImpactEstimator;
