const { ResponseError } = require('../utils/index');
const xml = require('xml2js');
const builder = new xml.Builder();

module.exports = controller => {
    return async (request, response) => {
        try {
            let x = await controller(request);
            if (request.headers['content-type'] === 'application/xml') {
                return response.status(x.status).send(builder.buildObject(x.data));
            }
            return response.status(x.status).send(x.data);
        } catch (error) {
            // console.error(error.message);
            if (error instanceof ResponseError)
                return response.status(error.status).send({
                    error: true,
                    message: error.message
                });
            return response.status(500).send(`${error.message} - ${error.stack}`);
        }
    };
}