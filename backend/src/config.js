"use strict";

//Configuration variables
const port      = process.env.PORT        || '3000';
const elasticsearchHost = process.env.ELASTICSEARCH_HOST || '192.168.99.100:9200';
const elasticsearchVersion = process.env.ELASTICSEARCH_Version || '7.4';
const elasticsearchUsername = process.env.ELASTICSEARCH_USERNAME || 'elastic';
const elasticsearchPassword = process.env.ELASTICSEARCH_PASSWORD || 'changeme';
module.exports = {
    port,
    elasticsearchHost,
    elasticsearchVersion,
    elasticsearchUsername,
    elasticsearchPassword
};
