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
	imageURL: {
		type: String,
		required: true
	},
	ratingsCount: {
		type: Number
	},
	ratingsSum: {
		type: Number
	},
	description: {
		type: String
	}
});

let collectionName = 'items'
module.exports = mongoose.model(collectionName, itemSchema);
