var session = require('express-session')

module.exports = session({
	secret: '3Jpx8m3Z l8Y',
	resave: false,
	saveUninitialized: true,
	cookie:{
		maxAge:60000000
	}
})
