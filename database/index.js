// App imports.
const songs = require('./songs');
const users = require('./users');

module.exports = (db) => {
	// Create and return an object containing
	// the database services.
	return {
		songs: new songs(db),
		users: new users(db)
	};
};