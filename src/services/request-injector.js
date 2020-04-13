const xml = require('xml2js');
const { ResponseError } = require('../utils/index');

const builder = new xml.Builder();

module.exports = (controller) => async (request, response) => {
  try {
    const x = await controller(request);
    // console.log(request.url.includes('xml'));
    if (request.url.includes('xml')) {
      response.type('application/xml');
      return response.status(x.status).send(builder.buildObject(x.data));
    }
    response.type('application/json');
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
