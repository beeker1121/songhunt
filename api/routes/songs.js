// handleGet handles GET requests to the /api/songs endpoint.
const handleGet = (app, services) => {
	app.get('/api/songs', (req, res, next) => {
		services.songs.get()
		.then((songs) => {
			res.json({ data: songs});
		}).catch((err) => {
			next(err);
		})
	});
}

// handlePost handles POST requests to the /api/songs endpoint.
const handlePost = (app, services) => {
	app.post('/api/songs', (req, res, next) => {
		console.log("Will create with title as: " + req.body.title);

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
		})
	})
}

module.exports = (app, services) => {
	// Create the routes.
	handleGet(app, services);
	handlePost(app, services);
}