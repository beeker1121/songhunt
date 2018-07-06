// App imports.
const errors = require('../errors');

// validateCreateOptions validates the create method options.
const validateCreateOptions = (opts) => {
	// Set opts default value to an empty object
	// if necessary, so we can check if properties
	// exist on it.
	opts = opts || {};

	// Create new OptionErrors to handle any
	// option validation errors.
	var oes = new errors.OptionErrors();

	// Validate the options.
	if (typeof opts.title === 'undefined' || opts.title === null)
		oes.add(new errors.OptionError('title', 'title cannot be empty'));
	else if (typeof opts.title !== 'string')
		oes.add(new errors.OptionError('title', 'title must be a string'));
	else if (opts.title === '')
		oes.add(new errors.OptionError('title', 'title cannot be empty'));

	if (typeof opts.artist === 'undefined' || opts.artist === null)
		oes.add(new errors.OptionError('artist', 'artist cannot be empty'));
	else if (typeof opts.artist !== 'string')
		oes.add(new errors.OptionError('artist', 'artist must be a string'));
	else if (opts.artist === '')
		oes.add(new errors.OptionError('artist', 'artist cannot be empty'));

	if (typeof opts.url === 'undefined' || opts.url === null)
		oes.add(new errors.OptionError('url', 'url cannot be empty'));
	else if (typeof opts.url !== 'string')
		oes.add(new errors.OptionError('url', 'url must be a string'));
	else if (opts.url === '')
		oes.add(new errors.OptionError('url', 'url cannot be empty'));

	// Return if there are option errors.
	if (oes.errors.length > 0) {
		return oes;
	}

	return;
};

// Service defines the songs service.
class Service {
	constructor(db, sc) {
		// The database service.
		this.db = db || null;

		// The SoundCloud API client.
		this.sc = sc || null;
	}

	// get handles getting songs.
	get(opts) {
		return this.db.songs.get(opts);
	}

	// create handles creating a new song.
	create(opts) {
		return new Promise((resolve, reject) => {
			// Validate the options.
			let oes = validateCreateOptions(opts);
			if (oes)
				return reject(oes);

			// Get the thumbnail using the SoundCloud API.
			this.sc.get('https://api.soundcloud.com/resolve?url=' + opts.url,
				(err, track) => {
					if (err) {
						reject(new errors.SoundCloudError(err, 'url', 'SoundCloud does not allow sharing for this song!'));
						return;
					}

					// Set the thumbnail URL.
					opts.thumbnailUrl = track.artwork_url;

					// Create the song in the database.
					this.db.songs.create(opts)
					.then((song) => {
						resolve(song);
					}).catch((err) => {
						reject(err);
					});
				}
			);
		});
	}
}

module.exports = Service;