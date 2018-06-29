// App imports.
const songs = require('./routes/songs');
const errorHandler = require('./middleware/errors');

module.exports = (app, services) => {
	// Create the API routes.
	songs(app, services);

	// Set the middleware for error handling.
	app.use('/api', errorHandler);
}