// handlePost handles POST requests to the /api/signup endpoint.
const handlePost = (app, services) => {
	app.post('/api/signup', (req, res, next) => {
		// Create a new user.
		services.users.create({
			email: req.body.email,
			password: req.body.password,
			confirm_password: req.body.confirm_password
		}).then((user) => {
			res.json({
				data: {
					id: user.id,
					created_at: user.created_at,
					email: user.email
				}
			});
		}).catch((err) => {
			next(err);
		});
	});
};

module.exports = (app, services) => {
	// Create the routes.
	handlePost(app, services);
};