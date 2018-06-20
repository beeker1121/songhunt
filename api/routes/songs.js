// handleGet handles GET requests to the /api/songs endpoint.
const handleGet = (app, services) => {
	app.get('/api/songs', (req, res) => {
		services.songs.get();
		res.send('Hello World!');
	});
}

// handlePost handles POST requests to the /api/songs endpoint.
const handlePost = (app, services) => {
	app.post('/api/songs', (req, res) => {
		console.log("Will create with title as: " + req.body.title);

		// Create a new song.
		services.songs.create({
			title: req.body.title,
			artist: req.body.artist,
			url: req.body.url
		}).then((song) => {
			res.json({ id: song.id });
		}).catch((err) => {
			res.status(400).json({ status: err.message });
		})
	})
}

module.exports = (app, services) => {
	// Create the routes.
	handleGet(app, services);
	handlePost(app, services);
}