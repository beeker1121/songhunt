// handleGet handles GET requests to the /api/songs endpoint.
const handleGet = (app, services) => {
	app.get('/api/songs', (req, res, next) => {
		// Create the response.
		let response = {
			data: [],
			links: {
				prev: null,
				next: null
			}
		};

		// Handle the options.
		let opts = {};

		if (typeof req.query.days_ago !== 'undefined') {
			// Set the daysAgo option.
			opts.daysAgo = parseInt(req.query.days_ago) || 0;

			// Set the prev and next values for links
			// in the response.
			if (opts.daysAgo > 0) {
				response.links.prev = 'http://104.197.141.188/api/songs?days_ago=' + (opts.daysAgo - 1);
			}
			response.links.next = 'http://104.197.141.188/api/songs?days_ago=' + (opts.daysAgo + 1);
		}

		// Get the songs.
		services.songs.get(opts)
		.then((songs) => {
			response.data = songs;
			res.json(response);
		}).catch((err) => {
			next(err);
		});
	});
};

// handlePost handles POST requests to the /api/songs endpoint.
const handlePost = (app, services) => {
	app.post('/api/songs', (req, res, next) => {
		// Create a new song.
		services.songs.create({
			userId: 1,
			title: req.body.title,
			artist: req.body.artist,
			url: req.body.url
		}).then((song) => {
			res.json({ data: song });
		}).catch((err) => {
			next(err);
		});
	});
};

module.exports = (app, services) => {
	// Create the routes.
	handleGet(app, services);
	handlePost(app, services);
};