"use strict";


const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/api-definitions/api.yaml');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const middlewares = require('./middlewares');

const events = require('./routes/events');
const mainLocations = require('./routes/mainLocations');
const configurations = require('./routes/configurations');
const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Global-supply-chain-threat-analysis Backend'
    });
});

// API routes
api.use('/events', events);
api.use('/mainlocations', mainLocations);
api.use('/configurations', configurations);
api.use('/api-docs', swaggerUi.serve);
api.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = api;

