const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	itemName: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	itemImage: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		default: 0
	},
	description: {
		type: String
	},
	availability: {
		type: Boolean,
		default: true
	}
});

let collectionName = 'items'
module.exports = mongoose.model(collectionName, itemSchema);
