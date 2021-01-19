const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'mickey';

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		user_name: user.user_name,
		email: user.email,
		role: user.role,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix(),
	}

	return jwt.encode(payload, secret);
}
