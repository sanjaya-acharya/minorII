const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model
		required: true,
	},
	cartItems: [
		{
			itemId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Item', // Reference to the Item model
			},
			quantity: {
				type: Number,
				required: true,
			},
			itemImage: {
				type: String,
				required: true
			}
		},
	],
	orderDate: {
		type: Date,
		default: Date.now,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
	expectedTime: {
		type: Date,
		default: Date.now()
	},
	status: {
		type: String,
		default: 'unpaid'
	}
});

let collectionName = 'orders'
module.exports = mongoose.model(collectionName, orderSchema);
