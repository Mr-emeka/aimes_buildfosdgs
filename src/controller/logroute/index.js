const path = require('path');
const fs = require('fs');

module.exports = async (request, response) => {
  const logs = fs.readFileSync(path.join(__dirname, '../../logs/log.txt'), { encoding: 'utf-8' });
  response.type('text/plain');
  response.status(201).send(logs);
};
