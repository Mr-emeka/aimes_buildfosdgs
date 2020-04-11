const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { router } = require('./routes/index');
const xmlParser = require('express-xml-bodyparser');

const app = express();
require('dotenv').config();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// cors
app.use(cors());

// middle ware for logs
app.use(logger('dev'));

// log all requests to access.log
app.use(logger('tiny', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

// This will parse any XML-based request and place it as a JavaScript object on req.body for your route handlers to use.

app.use(xmlParser({
    charkey: 'value',
    trim: false,
    explicitRoot: false,
    explicitArray: false,
    normalizeTags: false,
    mergeAttrs: true
}))

app.use(bodyParser.json());

app.use('/api/v1/', router)

app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to covid-19 api"
    })
})

app.get('*', (req, res) => {
    res.status(404).json({
        message: "404 Route not found"
    })
})
const PORT = 3001 || process.env.PORT
app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))





module.exports = app;