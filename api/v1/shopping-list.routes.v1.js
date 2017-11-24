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
		.catch((error) => res.status(400).json(error));
});

routes.get('/shopping-list/:id', function (req, res) {
	const id = req.params.id;
	
	ShoppingList.find({'_id': id})
		.then((shoppingList) => {
			console.log(shoppingList);
			res.status(200).json(shoppingList);
		})
		.catch((error) => res.status(400).json(error));
});

routes.put('/shopping-list/:id', function (req, res) {
	const id = req.params.id;
	const body = req.body;
	
	ShoppingList.findByIdAndUpdate({'_id': id}, body)
		.then(() => ShoppingList.findById({_id: id}))
		.then(shoppinglist => {
			if (shoppinglist == null || shoppinglist == 'null') {
				res.status(400).json({error: 'No objects updated'});
			} else {
				res.status(200).send(shoppinglist)
			}
		})
		.catch((error) => res.status(400).json(error));
});

routes.post('/shopping-list', function (req, res) {
	const body = req.body;
	
	ShoppingList.create(body)
		.then((driver) => res.status(200).send(driver))
		.catch((error) => res.status(400).json(error));
});

routes.delete('/shopping-list/:id', function (req, res) {
	const id = req.params.id;
	
	
	ShoppingList.findByIdAndRemove({'_id': id})
		.then((shoppingList) => {
			if (shoppingList == null || shoppingList == 'null') {
				res.status(400).json({error: 'No objects deleted.'});
			} else {
				res.status(200).send(shoppingList);
			}
		})
		.catch((error) => res.status(400).json(error));
	
});

module.exports = routes;