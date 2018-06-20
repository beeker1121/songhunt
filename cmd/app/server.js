const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const database = require('../../database');
const services = require('../../services');
const api = require('../../api');

// Connect to the MySQL database.
const db = mysql.createConnection({
	host: 'localhost',
	user: 'songhunt',
	password: 'songhunt123'
});

db.connect((err) => {
	if (err) {
		console.error('Could not connect to MySQL: ' + err.stack);
		return;
	}
});

// Create new express app.
const app = express();

// Support parsing of application/json type POST data.
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded POST data.
app.use(bodyParser.urlencoded({ extended: true }));

// Create a new API.
const dbServices = database(db);
const appServices = services(dbServices);
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
app.listen(80, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info('==> 🌎 Server is live on http://localhost:80...');
	}
});