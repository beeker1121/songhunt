// App imports.
const songs = require('./songs');
const users = require('./users');
const upvotes = require('./upvotes');

module.exports = (db) => {
	// Create and return an object containing
	// the database services.
	return {
		songs: new songs(db),
		users: new users(db),
		upvotes: new upvotes(db)
	};
};