const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
	itemID: {
		type: String,
		required: true
	},
	newPrice: {
		type: Number,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	}
});

let collectionName = 'promotions'
module.exports = mongoose.model(collectionName, promotionSchema);
