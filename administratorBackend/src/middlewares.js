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

    const token = req.headers['authentication'];
    if(!token || !token.includes('Bearer')){
            return res.status(401).send({
                error: 'Unauthorized',
                message: 'No token provided in the request'
            });
    }
    const authentication = new Buffer(token.split('Bearer')[1], 'base64').toString();
    console.log('authentication = ' + authentication);
    let clientId = authentication.split(':')[0] ;
    let clientSecret = authentication.split(':')[1];

    if(clientId === config.clientId && clientSecret ===config.clientSecret){
        next()
    } else{
        return res.status(401).send({
                    error: 'Unauthorized',
                    message: 'Invalid client credentials'
                })
    }
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
    errorHandler
};
