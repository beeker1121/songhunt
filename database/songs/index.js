// Define the SQL queries used in methods.
const getQuery = (whereClause) => {
	return `SELECT * FROM songhunt.songs${whereClause}`;
}

const createQuery = 'INSERT INTO songhunt.songs SET user_id=?, created_at=?, title=?, artist=?, url=?, embed_url=?, thumbnail=?';

// Database defines the songs database.
class Database {
	constructor(db) {
		this.db = db || null;
	}

	// get handles getting songs.
	get(opts = {}) {
		return new Promise((resolve, reject) => {
			// Create variables to hold the query fields
			// being filtered on and their values.
			let queryFields = '';
			let queryValues = [];

			// Handle days ago parameter.
			if (typeof opts.daysAgo !== 'undefined') {
				if (queryFields === '') {
					queryFields = " WHERE created_at BETWEEN ? AND ?";
				} else {
					queryFields += " AND created_at BETWEEN ? AND ?";
				}

				// Create the Date objects to use in
				// the query, set to the proper start
				// and end datetimes.
				let startDate = new Date();
				let endDate = new Date();

				// Set the start and end dates based
				// on the number of days ago.
				startDate.setDate(startDate.getDate() - opts.daysAgo);
				startDate.setHours(0, 0, 0, 0);
				endDate.setDate(endDate.getDate() - opts.daysAgo);
				endDate.setHours(23, 59, 59, 999);

				queryValues.push(startDate, endDate);
			}

			// Build the full query.
			let query = getQuery(queryFields);

			// Get from the database.
			this.db.query(query, [ ...queryValues ], (err, res) => {
				if (err)
					return reject(err);

				// Create a new set of songs.
				let songs = [];

				// Loop through the results.
				res.forEach((row) => {
					// Create a new song.
					let song = {
						id: row.id,
						user_id: 1,
						created_at: row.created_at,
						title: row.title,
						artist: row.artist,
						url: row.url,
						embed_url: row.embed_url,
						thumbnail: row.thumbnail
					};

					// Append it to the songs set.
					songs.push(song);
				});

				resolve(songs);
			});
		});
	}

	// create handles creating a new song.
	create(opts) {
		return new Promise((resolve, reject) => {
			// Set the created at time.
			let createdAt = new Date();

			// Save to the database.
			this.db.query(createQuery, [opts.userId, createdAt, opts.title, opts.artist, opts.url, opts.embedUrl, opts.thumbnail], (err, res) => {
				if (err)
					return reject(err);

				// Create a new song object.
				let song = {
					id: res.insertId,
					user_id: opts.userId,
					created_at: opts.createdAt,
					title: opts.title,
					artist: opts.artist,
					url: opts.url,
					embed_url: opts.embedUrl,
					thumbnail: opts.thumbnail
				};

				console.log("Inserted with ID: " + song.id);
				resolve(song);
			});
		});
	}
}

module.exports = Database;