// App imports.
const login = require('./routes/login');
const signup = require('./routes/signup');
const songs = require('./routes/songs');
const account = require('./routes/account');
const errorHandler = require('./middleware/errors');

module.exports = (app, services) => {
	// Create the API routes.
	login(app, services);
	signup(app, services);
	songs(app, services);
	account(app, services);

	// Set the middleware for error handling.
	app.use('/api', errorHandler);
};