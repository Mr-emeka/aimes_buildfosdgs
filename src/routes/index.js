const xmlParser = require('express-xml-bodyparser');
const { Router } = require('express');
const handler = require('../services/request-injector');
const getLogs = require('../controller/logroute/index');
const { estimate, estimateforJson, estimateforXml } = require('../controller/index');
const hasAllField = require('../middleware/index');

const router = Router();
// This will parse any XML-based request and place it as a JavaScript object on req.body for your route handlers to use.

const options = {
  charkey: 'value',
  trim: false,
  explicitRoot: false,
  explicitArray: false,
  normalizeTags: false,
  mergeAttrs: true
};

router.post('/on-covid-19', hasAllField, handler(estimate));
router.post('/on-covid-19/json', hasAllField, handler(estimateforJson));
router.post('/on-covid-19/xml', xmlParser(options), hasAllField, handler(estimateforXml));
router.get('/on-covid-19/logs', getLogs);

module.exports.router = router;
