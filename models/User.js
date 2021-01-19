const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
	name: String,
	surname: String,
	email: String,
	userName: String,
	password: String,
	role: String,
});

module.exports = mongoose.model('User', UserSchema);