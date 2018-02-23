var User = require('../models/User');

exports.registerUser = function (req, res) {
	var newUser = new User(req.body);

	newUser.save(function (err) {
		if (err) {
			console.log(err);
			res.status(200).send({
				status: false,
				error: 'User already exists!',
			});
		} else {
			console.log("Successfully created a user.");
			res.status(201).send({
				status: true,
			});
		}
	});
}
exports.authenticateUser = function (req, res) {
	User.authenticate(req.body['username'], req.body['password'], function (err, user) {
		if (err || user.length === 0) {
			res.status(201).send({
				status: false,
			});
		} else {
			res.status(200).send({
				status: true,
				token: user.token, // uuidv4 string auth token
			});
		}
	});
}
exports.expireUserToken = function (req, res) {
	User.expireToken(req.body, function (err, user) {
		if (err || user == null) {
			res.status(200).send({
				status: false,
			});
		} else {
			res.status(200).send({
				status: true,
			});
		}
	});
}
exports.getUserByToken = function (req, res) {
	User.findByToken(req.body, function (err, user) {
		if (err || user == null) {
			res.status(200).send({
				"status": false,
				"error": "Invalid authentication token."
			});
		} else {
			user.status = true;
			res.status(200).send({
				"status": true,
				"username": user.username,
				"fullname": user.fullname,
				"age": user.age,
			});
		}
	});
}