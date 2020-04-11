const { Router } = require('express');
const handler = require('../services/request-injector');
const getLogs = require('../controller/logs/index')
const estimate = require('../controller/index');
const hasAllField = require('../middleware/index');



const router = Router();

router.post('/on-covid-19', hasAllField, handler(estimate));
router.post('/on-covid-19/json', hasAllField, handler(estimate));
router.post('/on-covid-19/xml', hasAllField, handler(estimate));
router.get('/on-covid-19/logs', getLogs);





module.exports.router = router;