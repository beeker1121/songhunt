// App imports.
const auth = require('../../../middleware/auth');

// handlePost handles POST requests to the /api/songs/:id/upvote endpoint.
const handlePost = (app, services) => {
	app.post('/api/songs/:id/upvote', auth.authJWT(services), (req, res, next) => {
		// Create a new song.
		services.songs.upvote({
			userId: req.user.id,
			songId: parseInt(req.params.id)
		}).then((song) => {
			res.json({ data: song });
		}).catch((err) => {
			next(err);
		});
	});
};

module.exports = (app, services) => {
	// Create the routes.
	handlePost(app, services);
};