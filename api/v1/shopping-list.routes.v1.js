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

routes.get('/shopping-list/:id', function(req, res) {
	const id = req.params.id;

	ShoppingList.find({'_id': id})
        .then((shoppingList) => {
			console.log(shoppingList);
			res.status(200).json(shoppingList);
		})
        .catch((error) => res.status(401).json(error));
});

routes.put('/shopping-list/:id', function(req, res, err) {
	const id = req.params.id;
	const body = req.body;

	ShoppingList.findByIdAndUpdate({'_id': id}, body)
    .then(() => ShoppingList.findById({ _id : id}))
    .then( shoppinglist => res.send(shoppinglist))
    .catch((err) => res.status(401).json(err));
});

module.exports = routes;