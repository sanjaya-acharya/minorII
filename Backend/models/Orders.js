const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	emailID: {
		type: String,
		required: true
	},
	cartItems: [
		{
			cartID: {
				type: String,
				required:true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			itemName:{
				type:String,
				required: true
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
