const songs = require('./routes/songs');

module.exports = (app, services) => {
	// Create the API routes.
	songs(app, services);
}