const xml = require('xml2js');

const builder = new xml.Builder();

function hasAllFields(request, response, next) {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = request.body;
  if (!region || !periodType || !timeToElapse || !reportedCases || !population || !totalHospitalBeds) {
    if (request.url.includes('xml') || request.headers['content-type'] === 'application/xml') {
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
