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
                ).then(res => {response.status(404).send([])}, handleError(response))
            }
            else{
                response.status(404).send([]);
            }
        }else{
            response.status(500).send(err);
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
    console.log(req);
    res.status(200).send();
};

const updateLocationById = async (req, res) => {
    const {
        locationId
    } = req.params;
    client.get({
        index: 'main_locations',
        id: locationId,
    }).then(response =>{
        if(response.found) {
            console.log(response);
            return res.status(200).send(response._source);
        }else {
            return res.status(404).send();
        }
    }, handleError(res));
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
        console.log(response);
        if (response.result === 'deleted') {
            console.log(response);
            return res.status(200).send(response);
        } else {
            console.log(response);
            return res.status(500).send('internal error happens');
        }
    }, handleError(res));
};

module.exports = {
    getAllLocations,// List all locations
    createLocation,
    updateLocationById,
    deleteLocationById
};