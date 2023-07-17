const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	itemID: {
		type: String,
		required: true
	},
	stars: {
		type: Number,
		required: true
	},
	message: {
		type: String
	}
});

let collectionName = 'ratings'
module.exports = mongoose.model(collectionName, ratingSchema);
