const errors = require('../errors');

// Service defines the songs service.
class Service {
	constructor(db) {
		this.db = db || null;
	}

	// get handles getting songs.
	get(opts) {
		return this.db.songs.get(opts);
	}

	// create handles creating a new song.
	create(opts) {
		// Create the new song in the database.
		return new Promise((resolve, reject) => {
			console.log("Gonna create from service");

			// Create new OptionErrors to handle any
			// option validation errors.
			var oes = new errors.OptionErrors();

			// Validate the options.
			if (typeof opts.title === 'undefined')
				oes.add(new errors.OptionError('title', 'title cannot be empty'));

			// Return if there were option errors.
			if (oes.errors.length > 0) {
				return reject(oes);
			}

			this.db.songs.create(opts).then((song) => {
				console.log("Successfully saved the song");
				resolve(song);
			}).catch((err) => {
				reject(err);
			})
		})
	}
}

module.exports = Service;