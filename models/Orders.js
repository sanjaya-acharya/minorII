const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	itemID: {
		type: String,
		required: true
	},
	itemQuantity: {
		type: Number,
		required: true
	},
	tableNumber: {
		type: Number,
		required: true
	},
	orderStatus: {
		type: String,
		required: true
	}
});

let collectionName = 'orders'
module.exports = mongoose.model(collectionName, orderSchema);
