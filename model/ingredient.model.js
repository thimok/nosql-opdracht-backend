const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
	name: String,
	amount: Number
});

// const Ingredient = mongoose.model('ingredient', IngredientSchema);

module.exports = IngredientSchema;