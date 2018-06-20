const hello = require('./routes/hello');
const songs = require('./routes/songs');

module.exports = (app, db) => {
	// Create the API routes.
	hello(app);
	songs(app, db);
}