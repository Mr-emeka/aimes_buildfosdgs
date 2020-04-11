const xml = require('xml2js');

const builder = new xml.Builder();

async function hasAllFields(request, response, next) {
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

  if (!region || !periodType || !timeToElapse || !reportedCases || !population || !totalHospitalBeds || !avgDailyIncomeInUSD || !avgDailyIncomePopulation || !name || !avgAge) {
    if (request.headers['content-type'] === 'application/xml') {
      return response.status(401).send(builder.buildObject({ error: true, message: 'All fields are required' }));
    }
    return response.status(401).send({
      error: true,
      message: 'All fields are required'
    });
  }
  return next();
}


module.exports = hasAllFields;
