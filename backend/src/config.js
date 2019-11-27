"use strict";

//Configuration variables
const port      = process.env.PORT        || '3000';
const elasticsearchHost = process.env.ELASTICSEARCH_HOST || '192.168.99.100';
const elasticsearchVersion = process.env.ELASTICSEARCH_Version || '7.4';
module.exports = {
    port,
    elasticsearchHost,
    elasticsearchVersion
};
