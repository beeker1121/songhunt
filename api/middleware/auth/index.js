const jwt = require('../../../cmd/app/node_modules/jsonwebtoken');

// App imports.
const AuthorizationError = require('./errors');

// issueNewJWT issues a new JSON Web Token.
const issueNewJWT = (jwtSecret, userId) => {
	// Create our token claims with the user ID
	// set and the expiry time set to 24 hours.
	let claims = {
		userId: userId,
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + 86400
	};

	// Return a new signed token.
	return jwt.sign(claims, jwtSecret);
};

// authJWT is middleware for authenticating a route that receives a JSON Web
// Token.
//
// This function implements the signature express expects for handling
// middleware, i.e. function(req, res, next).
const authJWT = (req, res, next) => {
	console.log('Will auth here');
	// Check for Authorization header.
	if (typeof req.headers === 'undefined')
		return next(new AuthorizationError('You must pass a valid token via the Authorization header'));

	if (typeof req.headers.authorization === 'undefined')
		return next(new AuthorizationError('You must pass a valid token via the Authorization header'));

	// Split the header into sections.
	let parts = req.headers.authorization.split(' ');

	// Check authorization is using a Bearer token.
	if (!/^Bearer$/i.test(parts[0]))
		return next(new AuthorizationError('You must provide a token via the Bearer authorization method'));

	next();
};

module.exports = {
	issueNewJWT,
	authJWT
};