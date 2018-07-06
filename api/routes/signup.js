// handlePost handles POST requests to the /api/songs endpoint.
const handlePost = (app, services) => {
	app.post('/api/signup', (req, res, next) => {
		// Create a new user.
		services.users.create({
			email: req.body.email,
			password: req.body.password,
			confirm_password: req.body.confirm_password
		}).then((user) => {
			res.json({ data: user });
		}).catch((err) => {
			next(err);
		});
	});
};

module.exports = (app, services) => {
	// Create the routes.
	handlePost(app, services);
};