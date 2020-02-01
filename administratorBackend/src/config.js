"use strict";

//Configuration variables
const port      = process.env.PORT        || '4300';
//const elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'localhost:9200';
const elasticsearchHost = process.env.ELASTICSEARCH_HOST || '192.168.99.100:9200';
const elasticsearchVersion = process.env.ELASTICSEARCH_Version || '7.4';
const elasticsearchUsername = process.env.ELASTICSEARCH_USERNAME || 'elastic';
const elasticsearchPassword = process.env.ELASTICSEARCH_PASSWORD || 'changeme';
const jwtSecret = "Secret";
const serviceAuthenticationCode = process.env.SERVICE_AUTHENTICATION_CODE || "VerySecretSecret";

const hereMaps_AppCode = process.env.HERE_APP_CODE || 'Gyhqa53c7Nk4KbMtIsSs5A';
const hereMaps_AppID = process.env.HERE_APP_ID || 'xideIeuhyW0kOQR2u34D';


module.exports = {
    port,
    elasticsearchHost,
    elasticsearchVersion,
    elasticsearchUsername,
    elasticsearchPassword,
    jwtSecret,
    serviceAuthenticationCode,
    hereMaps_AppID,
    hereMaps_AppCode
};
