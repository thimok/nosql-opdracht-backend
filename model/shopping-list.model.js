const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IngredientSchema = require('./ingredient.model');

const ShoppingListSchema = new Schema({
	name: String,
	amount: Number
}, {
	timestamps: true
});


const ShoppingList = mongoose.model('shopping-list', ShoppingListSchema);

module.exports = ShoppingList;