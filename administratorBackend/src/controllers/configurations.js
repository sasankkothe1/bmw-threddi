const client = require('../connections/elasticsearchClient').client;

function handleScrollSuccess(response){
    return async function(resp){
        let responseQueue = [];
        let responseSet = [];
        responseQueue.push(resp);
        while (responseQueue.length) {
            let body = responseQueue.shift();
            body.hits.hits.forEach(function (hit) {
                responseSet.push(hit)
            });
            //if more configurations
            if (responseSet.length !== resp.hits.total.value) {
                responseQueue.push(
                    await client.scroll({
                        scrollId: body._scroll_id,
                        scroll: '10s'
                    }))
            }
        }
        response.status(200).send(responseSet);
    }
}

function handleError(response) {
    return function(err){
        console.log(err);
        if(err.statusCode === 404){
            if(err.message.includes('index_not_found_exception')){
                client.indices.create({
                        index: "configurations"
                    }
                ).then(res => {response.status(200).send([])}, handleError(response))
            }
            else{
                return response.status(404).json();
            }
        }
        else {
            return response.status(500).json(err);
        }
    }
}

const getAllConfigurations = async (req, res) => {
    await client.search({
        index: 'configurations',
        // keep the search results "scrollable" for 30 seconds
        scroll: '30s',
        // for the sake of this example, we will get only 10000 result per search
        size: 1000,
        // filter the source to only include the quote field
        body: {
            query: {
                match_all: {}
            }
        }
    }).then(handleScrollSuccess(res), handleError(res));
};

const createConfiguration = async (req, res) => {
    if (req._body) {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'configuration_id')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a configuration_id property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a name property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'description')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a description property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'processing')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a processing property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'default_properties')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a default_properties property'
        });

        //todo add verify logic

        if (await getById(req.body.configuration_id)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Configuration already exists'
            })
        }
        client.index({
            index: 'configurations',
            id: req.body.configuration_id,
            body: {configuration: Object.assign(req.body)},
        }).then(response => {
            console.log(response);
            return res.status(200).send()
        }, (err => {
            if(err.statusCode === 404){
                if(err.message.includes('index_not_found_exception')){
                    client.indices.create({
                            index: "configurations"
                        }
                    ).then(res => {client.index({
                        index: 'configurations',
                        id: req.body.configuration_id,
                        body: {configuration: Object.assign(req.body)},
                    }).then(response => {
                        console.log(response);
                        return res.status(200).send()
                    }, handleError(res))
                })}
                else{
                    return res.status(404).json();
                }
            }
        }));
    }else {
        return res.status(400).json("No Request Body");
    }
};

const getConfigurationById = async (req, res) => {
    const {
        configurationId
    } = req.params;
    client.get({
        index: 'configurations',
        id: configurationId,
    }).then(response =>{
        if(response.found) {
            console.log(response);
            res.status(200).send(response);
        }else {
            res.status(404).send();
        }
    }, err => {
        console.log(err);
        if(err.statusCode === 404){
            if(err.message.includes('index_not_found_exception')){
                client.indices.create({
                        index: "configurations"
                    }
                ).then(res => {res.status(404).json()}, handleError(res))
            }
            else{
                return res.status(404).json();
            }
        }
        return res.status(500).json(err);
    });
};

const updateConfigurationById = async (req, res) => {
    const {
        configurationId
    } = req.params;
    client.update({
        index: 'configurations',
        id: configurationId,
        body: {doc: Object.assign(req.body)}
    }).then(response =>{
        return res.status(200).json(response);
    }, err => {
        console.log(err);
        if(err.statusCode === 404){
            if(err.message.includes('index_not_found_exception')){
                client.indices.create({
                        index: "configurations"
                    }
                ).then(updateConfigurationById(req, res), handleError(res))
            }
            else{
                return res.status(404).json();
            }
        }
        return res.status(500).json(err);
    });
};

const getById = async (configurationId) => {
    return client.get({
        index: 'configurations',
        id: configurationId,
    }).then(response =>{
        if(response.found) {
            console.log(response);
            return response;
        }else {
            return null;
        }
    }, err=> {
        console.log(err);
        //if no path, then create a new one
        if (err.statusCode === 404) {
            if(err.message.includes('index_not_found_exception')){
                client.indices.create({
                        index: "configurations"
                    }
                ).then(null)
            }
            return null
        }
    });
};

const deleteConfigurationById = async (req, res) => {
    const {
        configurationId
    } = req.params;
    client.delete({
        index: 'configurations',
        id: configurationId,
        refresh: true,
    }).then(response => {
        if (response.result === 'deleted') {
            res.status(200).send(response);
        } else {
            res.status(500).send('internal error happens');
        }
    }, handleError(res))
};

module.exports = {
    getAllConfigurations,// List all configurations
    createConfiguration,
    getConfigurationById,
    updateConfigurationById,
    deleteConfigurationById
};
