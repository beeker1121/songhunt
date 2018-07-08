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

// validateUpvoteOptions validates the upvote method options.
const validateUpvoteOptions = (opts) => {
	// Set opts default value to an empty object
	// if necessary, so we can check if properties
	// exist on it.
	opts = opts || {};

	// Create new OptionErrors to handle any
	// option validation errors.
	var oes = new errors.OptionErrors();

	// Validate the options.
	if (typeof opts.userId === 'undefined' || opts.userId === null)
		oes.add(new errors.OptionError('user_id', 'User ID cannot be empty'));
	else if (typeof opts.userId !== 'number')
		oes.add(new errors.OptionError('user_id', 'User ID must be an integer'));
	else if (opts.userId === 0)
		oes.add(new errors.OptionError('user_id', 'User ID cannot be 0'));

	if (typeof opts.songId === 'undefined' || opts.songId === null)
		oes.add(new errors.OptionError('song_id', 'Song ID cannot be empty'));
	else if (typeof opts.songId !== 'number')
		oes.add(new errors.OptionError('song_id', 'Song ID must be an integer'));
	else if (opts.songId === 0)
		oes.add(new errors.OptionError('song_id', 'Song ID cannot be 0'));

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
		return this.db.songs.getWithUpvotes(opts);
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

	// upvote handles upvoting a song.
	upvote(opts) {
		return new Promise((resolve, reject) => {
			// Validate the options.
			let oes = validateUpvoteOptions(opts);
			if (oes)
				return reject(oes);

			// Get the song from the database.
			this.db.songs.getByIdWithUpvotes(opts.songId)
			.then((song) => {
				if (!song)
					return reject(new errors.OptionError('song_id', 'Song does not exist'));

				// Create a new upvote for this song.
				this.db.upvotes.create(opts)
				.then((upvote) => {
					// Increment song upvotes.
					song.upvotes++;
					resolve(song);
				}).catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}
}

module.exports = Service;