// Define the SQL queries used in methods.
const getQuery = (whereClause) => {
	return `SELECT * FROM songhunt.songs${whereClause}`;
};

const getWithUpvotesQuery = (whereClause) => {
	return `
SELECT s.*, COUNT(u.id) AS upvotes
FROM songhunt.songs AS s
LEFT JOIN songhunt.upvotes AS u ON u.song_id=s.id
${whereClause}
GROUP BY s.id
	`;
};

const getByIdWithUpvotesQuery = `
SELECT s.*, COUNT(u.id) AS upvotes
FROM songhunt.songs AS s
LEFT JOIN songhunt.upvotes AS u ON u.song_id=s.id
WHERE s.id=?
GROUP BY s.id
`;

const createQuery = `
INSERT INTO songhunt.songs
SET user_id=?,
	created_at=?,
	title=?,
	artist=?,
	genre=?,
	url=?,
	thumbnail_url=?
`;

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
						user_id: row.user_id,
						created_at: row.created_at,
						title: row.title,
						artist: row.artist,
						genre: row.genre,
						url: row.url,
						thumbnail_url: row.thumbnail_url
					};

					// Append it to the songs set.
					songs.push(song);
				});

				resolve(songs);
			});
		});
	}

	// getWithUpvotes handles getting songs while querying the upvotes table
	// to get the total upvotes for each song.
	getWithUpvotes(opts = {}) {
		return new Promise((resolve, reject) => {
			// Create variables to hold the query fields
			// being filtered on and their values.
			let queryFields = '';
			let queryValues = [];

			// Handle days ago parameter.
			if (typeof opts.daysAgo !== 'undefined') {
				if (queryFields === '') {
					queryFields = " WHERE s.created_at BETWEEN ? AND ?";
				} else {
					queryFields += " AND s.created_at BETWEEN ? AND ?";
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
			let query = getWithUpvotesQuery(queryFields);

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
						user_id: row.user_id,
						created_at: row.created_at,
						title: row.title,
						artist: row.artist,
						genre: row.genre,
						url: row.url,
						thumbnail_url: row.thumbnail_url,
						upvotes: row.upvotes
					};

					// Append it to the songs set.
					songs.push(song);
				});

				resolve(songs);
			});
		});
	}

	// getByIdWithUpvotes gets a song by its ID while querying the upvotes
	// table to get the total upvotes for the song.
	getByIdWithUpvotes(id) {
		return new Promise((resolve, reject) => {
			// Get from the database.
			this.db.query(getByIdWithUpvotesQuery, [id], (err, res) => {
				if (err)
					return reject(err);

				// If no song was found for this
				// id, return null.
				if (res.length === 0)
					return resolve(null);

				// Create a new song.
				let song = {
					id: res[0].id,
					user_id: res[0].user_id,
					created_at: res[0].created_at,
					title: res[0].title,
					artist: res[0].artist,
					genre: res[0].genre,
					url: res[0].url,
					thumbnail_url: res[0].thumbnail_url,
					upvotes: res[0].upvotes
				};

				resolve(song);
			});
		});
	}

	// create handles creating a new song.
	create(opts) {
		return new Promise((resolve, reject) => {
			// Set the created at time.
			let createdAt = new Date();

			// Save to the database.
			this.db.query(createQuery, [opts.userId, createdAt, opts.title, opts.artist, opts.genre, opts.url, opts.thumbnailUrl], (err, res) => {
				if (err)
					return reject(err);

				// Create a new song object.
				let song = {
					id: res.insertId,
					user_id: opts.userId,
					created_at: createdAt,
					title: opts.title,
					artist: opts.artist,
					genre: opts.genre,
					url: opts.url,
					thumbnail_url: opts.thumbnailUrl
				};

				resolve(song);
			});
		});
	}
}

module.exports = Database;