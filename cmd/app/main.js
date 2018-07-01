const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// App imports.
const database = require('../../database');
const services = require('../../services');
const api = require('../../api');
const config = require('../../api/config');

// Third party imports.
var soundcloud = require('node-soundcloud');

// Set the configuration options from the environment.
config.dbHost = process.env.DB_HOST || config.dbHost;
config.dbUser = process.env.DB_USER || config.dbUser;
config.dbPass = process.env.DB_PASS || config.dbPass;
config.port = process.env.PORT || config.port;
config.soundCloudClientId = process.env.SOUNDCLOUD_CLIENT_ID || config.soundCloudClientId;

// Connect to the MySQL database.
const db = mysql.createConnection({
	host: config.dbHost,
	user: config.dbUser,
	password: config.dbPass
});

db.connect((err) => {
	if (err) {
		console.error('Could not connect to MySQL: ' + err.stack);
		process.exit(1);
		return;
	}
});

// Create new express app.
const app = express();

// Support parsing of application/json type POST data.
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded POST data.
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the SoundCloud client.
soundcloud.init({
	id: config.soundCloudClientId
});

// Create a new database service.
const dbServices = database(db);

// Create a new application service.
const appServices = services(dbServices, soundcloud);

// Create a new API.
api(app, appServices);

// Handle serving public files.
app.use(express.static(path.join(__dirname, 'dist', 'public')));

// Handle serving index page. We use a catch-all
// route since we want all requests, except API
// requests, to go to the frontend application.
app.use((req, res) => {
	res.sendFile(__dirname + '/dist/public/index.html');
});

// Start the server.
app.listen(config.port, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info('==> 🌎 Server is live on http://localhost:' + config.port + '...');
	}
});