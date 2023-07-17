const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
	itemID: {
		type: String,
		required: true
	},
	Quantity: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

let collectionName = 'sales'
module.exports = mongoose.model(collectionName, saleSchema);
