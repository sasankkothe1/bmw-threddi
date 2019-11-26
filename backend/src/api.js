"use strict";


const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const middlewares = require('./middlewares');

const events = require('./routes/events');
const mainlocations = require('./routes/mainlocations');
const GDELT_events = require('./routes/GDELT_events');
const Twitter_events = require('./routes/Twitter_events');

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
api.use('/mainlocations', mainlocations);
api.use('/GDELT_events', GDELT_events);
api.use('/Twitter_events', Twitter_events);

module.exports = api;

