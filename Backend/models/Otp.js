const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
	otp: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	expiry: {
		type: Date,
		required: true
	},
	used: {
		type: Boolean,
		required: true
	}
});

let collectionName = 'otps'
module.exports = mongoose.model(collectionName, otpSchema);
