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
            //if more events
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
        if(err.statusCode === 404){
            if(err.message.includes('index_not_found_exception')){
                client.indices.create({
                        index: "events"
                    }
                ).then(res => {response.status(200).send([])}, handleError(response))
            }
            else{
                response.status(404).send();
            }
        }else{
            response.status(500).send(err);
        }
    }
}

const getAllEvents = async (req, res) => {
    await client.search({
        index: 'events',
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

const getEventLocation = async (req, res) => {
    const {
        eventId
    } = req.params;
    client.get({
        index: 'events',
        id: eventId,
    }).then(response =>{
        if(response.found) {
            res.status(200).send(response._source.locationInfo);
        }else {
            res.status(404).send();
        }
    }, handleError(res));
};

const getEventById = async (req, res) => {
    const {
        eventId
    } = req.params;
    client.get({
        index: 'events',
        id: eventId,
    }).then(response =>{
        if(response.found) {
            res.status(200).send(response);
        }else {
            res.status(404).send();
        }
    }, handleError(res));
};

const deleteEventById = async (req, res) => {
    const {
        eventId
    } = req.params;
    client.delete({
        index: 'events',
        id: eventId,
        refresh: true,
    }).then(response => {
        if (response.result === 'deleted') {
            res.status(200).send(response);
        } else {
            res.status(500).send('internal error happens');
        }
    }, handleError(res));
};



module.exports = {
    getAllEvents,
    getEventById,
    deleteEventById,
    getEventLocation
};
