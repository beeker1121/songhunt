// App imports.
const songs = require('./songs');
const users = require('./users');

module.exports = (db, sc) => {
	// Create and return an object containing
	// the services.
	return {
		songs: new songs(db, sc),
		users: new users(db)
	};
}