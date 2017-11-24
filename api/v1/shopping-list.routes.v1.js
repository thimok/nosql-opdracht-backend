var express = require('express');
var routes = express.Router();
var mongodb = require('../../config/mongo.db');
var ShoppingList = require('../../model/shopping-list.model');

routes.get('/shopping-list', function (req, res) {
    res.contentType('application/json');

    ShoppingList.find({})
        .then((shoppingList) => {
            console.log(shoppingList);
            res.status(200).json(shoppingList);
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/shopping-list/:id', function (req, res) {
    const id = req.params.id;

    ShoppingList.find({'_id': id})
        .then((shoppingList) => {
            console.log(shoppingList);
            res.status(200).json(shoppingList);
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/shopping-list', function(req, res) {
	const body = req.body;
	
	ShoppingList.create(body)
		.then((driver) => res.status(200).send(driver))
		.catch((error) => res.status(400).json(error));
});

routes.delete('/shopping-list/:id', function (req, res) {
    const id = req.params.id;

    // ShoppingList.findByIdAndRemove({'_id': id})
    //     .then((shoppingList) => res.status(200).send(shoppingList))
    //     .catch((error) => res.status(401).json(error));

    ShoppingList.findByIdAndRemove({'_id': id})
        .then((shoppingList) => {
            if (shoppingList == null || shoppingList == 'null') {
                res.status(200).json({error: 'No objects deleted.'});
            } else {
                res.status(200).send(shoppingList);
            }
        })
        .catch((error) => res.status(401).json(error));

});
module.exports = routes;