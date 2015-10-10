var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./config');
var UserModel = require('./website/models/users');

var Passport = function(passport) {
  this.model = new UserModel();

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

  var self = this;
	passport.use(new TwitterStrategy({
		consumerKey		 : config.twitter.key,
		consumerSecret	: config.twitter.secret,
		callbackURL		 : '/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {
    var data = {};
    data.provider profile.provider;
    data.photo = profile.photos[0].value;
    data.id = profile.id;
    data.name = profile.displayName;
    self.model.loginUser(data, done);
	}));

	passport.use(new FacebookStrategy({
		clientID			: config.facebook.id,
		clientSecret	: config.facebook.secret,
		callbackURL	 : '/auth/facebook/callback',
		profileFields : ['id', 'displayName', 'photos']
	}, function(accessToken, refreshToken, profile, done) {
    var data = {};
    data.photo = profile.photos[0].value;
    data.id = profile.id;
    data.name = profile.displayName;
    profile.provider = "facebook";

		self.model.loginUser(data, done);
	}));
};

module.exports = Passport;
