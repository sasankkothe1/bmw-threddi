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
            if (responseSet.length != resp.hits.total.value) {
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
        console.log(err.statusCode);
        if(err.statusCode == 404){
            response.status(404).send(err);
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

const getEventById = async (req, res) => {
    const {
        eventId
    } = req.params;
    client.get({
        index: 'events',
        id: eventId,
    }).then(response =>{
        if(response.found) {
            console.log(response);
            return res.status(200).send(response._source);
        }else {
            return res.status(404).send();
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
        console.log(response);
        if (response.result == 'deleted') {
            console.log(response);
            return res.status(200).send(response);
        } else {
            console.log(response);
            return res.status(500).send('internal error happens');
        }
    }, handleError(res));
};



module.exports = {
    getAllEvents,
    getEventById,
    deleteEventById
};
