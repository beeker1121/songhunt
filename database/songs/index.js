// Define the SQL queries used in methods.
const getQuery = 'SELECT * FROM songhunt.songs';
const createQuery = 'INSERT INTO songhunt.songs SET title=?, artist=?, url=?';

// Database defines the songs database.
class Database {
	constructor(db) {
		this.db = db || null;
	}

	// get handles getting songs.
	get(opts) {
		console.log("Gonna get!");
	}

	// create handles creating a new song.
	create(opts) {
		console.log("Gonna create");

		// Wrap within a Promise, since we use an
		// anonymous callback to handle the response.
		return new Promise((resolve, reject) => {
			this.db.query(createQuery, [opts.title, opts.artist, opts.url], (err, res) => {
				if (err)
					return reject(err);

				// Create a new song object.
				var song = {
					id: res.insertId,
					title: opts.title,
					artist: opts.artist,
					url: opts.url
				}

				console.log("Inserted with ID: " + song.id);
				resolve(song);
			});
		});
	}
}

module.exports = Database;