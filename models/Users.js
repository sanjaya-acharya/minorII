const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	points: {
		type: Number,
		default: 0
	},
	balance: {
		type: Number,
		default: 0
	}
});

let collectionName = 'users'
module.exports = mongoose.model(collectionName, userSchema);
