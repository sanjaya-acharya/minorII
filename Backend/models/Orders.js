const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model
		required: true,
	},
	cartItems: [
		{
			cartID: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Cart', // Reference to the Cart model
			},
			quantity: {
				type: Number,
				required: true,
			},
			price:{
				type: Number,
				requied: true
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
