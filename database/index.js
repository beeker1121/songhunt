const songs = require('./songs');

module.exports = (db) => {
	// Create and return an object containing
	// the database services.
	return {
		songs: new songs(db)
	};
};