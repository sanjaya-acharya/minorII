const mongoose = require('mongoose');

const FavSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	itemID: {
		type: String,
		required: true
	}
});

let collectionName = 'favorites'
module.exports = mongoose.model(collectionName, FavSchema);
