// App imports.
const auth = require('../../../middleware/auth');

// handlePost handles POST requests to the /api/songs/:id/upvote endpoint.
const handlePost = (app, services) => {
	app.post('/api/songs/:id/upvote', auth.authJWT(services), (req, res, next) => {
		// Create a new upvote.
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

// handleDelete handles DELETE requests to the /api/songs/:id/upvote endpoint.
const handleDelete = (app, services) => {
	app.delete('/api/songs/:id/upvote', auth.authJWT(services), (req, res, next) => {
		// Delete the upvote.
		services.songs.unvote({
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
	handleDelete(app, services);
};