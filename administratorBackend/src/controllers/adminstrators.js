const client = require('../connections/elasticsearchClient').client;
const jwt = require('jsonwebtoken');
const config = require('../config');
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
function handleError(response) {
    return function(err){
        console.log(err);
        if(err.statusCode === 404){
            if(err.message.includes('index_not_found_exception')){
                client.indices.create({
                        index: "administrators"
                    }
                ).then(res => {response.status(200).send([])}, handleError(response))
            }
            else{
                return response.status(400).json();
            }
        }
        else {
            return response.status(500).json(err);
        }

    }
}

const register = async (req, res) => {
    if (req._body) {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'username') || ! emailPattern.test(req.body.username)) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a valid username property'
        });
        if (!Object.prototype.hasOwnProperty.call(req.body, 'password') || req.body.password.length < 8) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property'
        });
        if (await getByUsername(req.body.username)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Administrator already exists'
            })
        }
        client.index({
            index: 'administrators',
            id: req.body.username,
            body: {administrator: Object.assign(req.body)},
        }).then(response => {
            const token = jwt.sign({
                username: req.body.username,
            }, config.jwtSecret, {
                expiresIn: 100000,
            });
            return res.status(200).send({token: token})
        }, (err => {
            if(err.statusCode === 404){
                if(err.message.includes('index_not_found_exception')){
                    client.indices.create({
                            index: "administrators"
                        }
                    ).then(res => {client.index({
                        index: 'administrators',
                        id: req.body.username,
                        body: {administrator: Object.assign(req.body)},
                    }).then(response => {
                        const token = jwt.sign({
                            username: req.body.username,
                        }, config.jwtSecret, {
                            expiresIn: 100000,
                        });
                        return res.status(200).send({token:token})
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

const login = async (req, res) => {
    if (req._body) {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'username') || ! emailPattern.test(req.body.username)) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a username property'
        });

        if (!Object.prototype.hasOwnProperty.call(req.body, 'password') || req.body.password.length < 8) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property'
        });

        client.get({
            index: 'administrators',
            id: req.body.username,
        }).then(response =>{
            if(response.found && req.body.password === response._source.administrator.password) {
                const token = jwt.sign({
                    username: req.body.username,
                }, config.jwtSecret, {
                    expiresIn: 100000,
                });
                res.status(200).send({token:token});
            }else {
                res.status(404).send();
            }
        }, err => {
            console.log(err);
            if(err.statusCode === 404){
                if(err.message.includes('index_not_found_exception')){
                    client.indices.create({
                            index: "administrators"
                        }
                    ).then(res => {res.status(404).json()}, handleError(res))
                }
                else{
                    return res.status(404).json();
                }
            }
            return res.status(500).json(err);
        });
    }else {
        return res.status(400).json("No Request Body");
    }
};

const getByUsername = async (username) => {
    return client.get({
        index: 'administrators',
        id: username,
    }).then(response =>{
        if(response.found) {
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
                        index: "administrators"
                    }
                ).then(null)
            }
            return null
        }
    });
};

module.exports = {
    login,
    register
};