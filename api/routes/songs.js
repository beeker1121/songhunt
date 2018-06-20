// handleGet handles GET requests to the /api/songs endpoint.
const handleGet = (app, db) => {
	app.get('/api/songs', (req, res) => {
		res.send('Hello World!');
	});
}

module.exports = (app, db) => {
	// Create the routes.
	handleGet(app, db);
}