const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	itemID: {
		type: String,
		required: true
	}
});

let collectionName = 'carts'
module.exports = mongoose.model(collectionName, cartSchema);
