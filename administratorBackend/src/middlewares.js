"use strict";

const config = require ('./config');
const jwt    = require('jsonwebtoken');

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.status(200).send(200);
    }
    else {
        next();
    }
};

const checkAuthentication = (req, res, next) => {

    const authentication = req.headers['authentication'];
    if(!authentication || !authentication.includes('Bearer')){
            return res.status(401).send({
                error: 'Unauthorized',
                message: 'No token provided in the request'
            });
    }
    const token = authentication.split('Bearer ')[1];
    console.log('token = ' + token);
    // verifies secret and checks exp
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) return res.status(401).send({
            error: 'Unauthorized',
            message: 'Failed to authenticate token.'
        });

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });


};

const checkAuthenticationForGetEndpoints = (req, res, next) => {

    const authenticationType = req.headers['authentication_type'];
    const authentication = req.headers['authentication'];
    if (authenticationType && authenticationType === 'service') {
        if (authentication === config.serviceAuthenticationCode) {
            next();
        } else {
            return res.status(401).send({
                error: 'Unauthorized',
                message: 'Invalid Authentication Code.'
            });
        }

    }
    else {
        if (!authentication || !authentication.includes('Bearer')) {
            return res.status(401).send({
                error: 'Unauthorized',
                message: 'No token provided in the request'
            });
        }
        const token = authentication.split('Bearer ')[1];
        console.log('token = ' + token);
        // verifies secret and checks exp
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) return res.status(401).send({
                error: 'Unauthorized',
                message: 'Failed to authenticate token.'
            });

            // if everything is good, save to request for use in other routes
            req.userId = decoded.id;
            next();
        });
    }
};

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    res.render('error', { error: err })
};


module.exports = {
    allowCrossDomain,
    checkAuthentication,
    checkAuthenticationForGetEndpoints,
    errorHandler
};
