const path = require('path');

module.exports = async (request, response) => {
  response.download(path.join(__dirname, '../../logs.log'), 'log.txt');
};
