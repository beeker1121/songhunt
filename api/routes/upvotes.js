// App imports.
const config = require('../config');
const auth = require('../middleware/auth');

// handleGet handles GET requests to the /api/upvotes endpoint.
const handleGet = (app, services) => {
	app.get('/api/upvotes', auth.authJWT(services), (req, res, next) => {
		// Log this user in.
		services.users.getUpvotes(req.user.id)
		.then((upvotes) => {
			res.json({ data: upvotes });
		}).catch((err) => {
			next(err);
		});
	});
};

module.exports = (app, services) => {
	// Create the routes.
	handleGet(app, services);
};