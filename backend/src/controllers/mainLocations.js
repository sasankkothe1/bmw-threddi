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
            //if more mainLocations
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
                        index: "main_locations"
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

const getAllLocations = async (req, res) => {
    await client.search({
        index: 'main_locations',
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

const createLocation = async (req, res) => {
    if (req._body) {

        if (!Object.prototype.hasOwnProperty.call(req.body, 'location_id')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a location_id property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'lat')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a lat property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'long')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a long property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'description')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a description property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'location_type')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a city property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'priority')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a priority property'
        });
        if (await getById(req.body.location_id)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Location already exists'
            })
        }
        client.index({
            index: 'main_locations',
            id: req.body.location_id,
            body: {mainLocation: Object.assign(req.body)},
        }).then(response => {
            console.log(response);
            return res.status(200).send()
        }, handleError(res));
    }else {
        return res.status(400).json("No Request Body");
    }
};

const updateLocationById = async (req, res) => {
    const {
        locationId
    } = req.params;
    client.update({
        index: 'main_locations',
        id: locationId,
        body: {doc: Object.assign(req.body)}
    }).then(response =>{
        return res.status(200).json(response);
    }, handleError(res));
};

const getById = async (locationId) => {
    return client.get({
        index: 'main_locations',
        id: locationId,
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
                        index: "main_locations"
                    }
                ).then(null)
            }
            return null
        }
    });
};

const deleteLocationById = async (req, res) => {
    const {
        locationId
    } = req.params;
    client.delete({
        index: 'main_locations',
        id: locationId,
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
    getAllLocations,// List all locations
    createLocation,
    updateLocationById,
    deleteLocationById
};