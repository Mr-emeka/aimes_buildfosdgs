const xml = require('xml2js');
const { ResponseError } = require('../utils/index');

const builder = new xml.Builder();

module.exports = (controller) => async (request, response) => {
  try {
    const x = await controller(request);
    if (request.url.includes('xml') || request.headers['content-type'] === 'application/xml') {
      return response.status(x.status).send(builder.buildObject(x.data));
    }
    return response.status(x.status).send(x.data);
  } catch (error) {
    // console.error(error.message);
    if (error instanceof ResponseError) {
      return response.status(error.status).send({
        error: true,
        message: error.message
      });
    }
    return response.status(500).send(`${error.message} - ${error.stack}`);
  }
};
