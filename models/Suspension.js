const mongoose = require('mongoose');

const suspensionSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	reason: {
		type: String,
		required: true,
	},
	expiry: {
		type: Date,
		required: true
	}
});

let collectionName = 'suspensions'
module.exports = mongoose.model(collectionName, suspensionSchema);
