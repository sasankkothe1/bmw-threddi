const elasticsearch = require('elasticsearch');
const config = require('../config');

const client = new elasticsearch.Client({
    host: config.elasticsearchUsername + ':' + config.elasticsearchPassword + '@' + config.elasticsearchHost,
    apiVersion: config.elasticsearchVersion, // use the same version of your Elasticsearch instance,
    maxRetries: 5,
    requestTimeout: 60000,
});

module.exports={
    client
};