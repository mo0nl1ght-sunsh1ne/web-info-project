const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

// User authorisation strategy
passport.use('user', new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'pwd'
	},
	function (username, password, done) {
		// Authenticate using email or username
		User.findOne({$or: [
			{'email': username},
			{'username': username}
		]}, function (err, user, res) {
			if (!err) {
        console.log(user.validatePassword(password))
				if (user.validatePassword(password) == true) {
					return done(null, user);
				} else {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
			} else {
				throw err;
			}
		});
	}
));

// Serialise User with id
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

// Find user in the database
passport.deserializeUser(function (id, done) {
	User.FindById(id, function (err, user) {
		done(err, user);
	});
});
