/**
 * Created by twanv on 24-11-2017.
 */
var express = require('express');
var routes = express.Router();
var Recipe = require('../../model/recipe.model');

routes.get('/recipes', function(req, res) {
    res.contentType('application/json');
    Recipe.find({})
        .then((recipes) => {
            res.status(200).json(recipes);
        })
        .catch((error) => res.status(400).send({error: error.message}));
});

routes.post('/recipes', function(req, res) {
    res.contentType('application/json');
    const recipeProps = req.body;
    Recipe.create(recipeProps)
        .then(recipe => res.status(201).send(recipe))
        .catch((error) => res.status(400).send({error: error.message}));
});

routes.put('/recipes/:id', function(req, res) {
    res.contentType('application/json');
    const recipeId = req.params.id;
    const recipeProps = req.body;

    Recipe.findByIdAndUpdate(
        recipeId,
        {
            name: recipeProps.name,
            ingredients: recipeProps.ingredients
        }
    )
    .then(() => Recipe.findById({_id: recipeId}))
    .then((recipe) => res.send(recipe))
    .catch((error) => res.status(400).send(({error: error.message})))
});

routes.delete('/recipes/:id', function(req, res) {
    res.contentType('application/json');
    const recipeId = req.params.id;

    Recipe.findByIdAndRemove({_id: recipeId})
        .then(driver => res.status(202).send(driver))
        .catch((error) => res.status(404).send({error: error.message}));
});

module.exports = routes;