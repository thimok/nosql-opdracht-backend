const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IngredientSchema = require('./ingredient.model');

const RecipeSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	ingredients: [IngredientSchema],
	imagePath: String,
	description: String
}, {
	timestamps: true
});


const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;