// App imports.
const songs = require('./songs');

module.exports = (db) => {
	// Create and return an object containing
	// the services.
	return {
		songs: new songs(db)
	};
}