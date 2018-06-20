// handleGet handles GET requests to the /api/hello endpoint.
const handleGet = (app) => {
	app.get('/api/hello', (req, res) => {
		res.send('Hello World!');
	});
}

module.exports = (app) => {
	// Create the routes.
	handleGet(app);
}