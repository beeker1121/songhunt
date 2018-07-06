// App imports.
const signup = require('./routes/signup');
const songs = require('./routes/songs');
const errorHandler = require('./middleware/errors');

module.exports = (app, services) => {
	// Create the API routes.
	signup(app, services);
	songs(app, services);

	// Set the middleware for error handling.
	app.use('/api', errorHandler);
}