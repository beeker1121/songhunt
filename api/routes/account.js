// App imports.
const auth = require('../middleware/auth');

// handleGet handles GET requests to the /api/account endpoint.
const handleGet = (app, services) => {
	app.get('/api/account', auth.authJWT, (req, res, next) => {
		res.json({success: true});
	});
};

module.exports = (app, services) => {
	// Create the routes.
	handleGet(app, services);
};