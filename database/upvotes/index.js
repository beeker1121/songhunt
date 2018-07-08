// Define the SQL queries used in methods.
const createQuery = `
INSERT INTO songhunt.upvotes
SET created_at=?,
	user_id=?,
	song_id=?
`;

const getByUserIdQuery = `
SELECT *
FROM songhunt.upvotes
WHERE user_id=?
`;

// Database defines the upvotes database.
class Database {
	constructor(db) {
		this.db = db || null;
	}

	// create handles creating a new upvote.
	create(opts) {
		return new Promise((resolve, reject) => {
			// Set the created at time.
			let createdAt = new Date();

			// Save to the database.
			this.db.query(createQuery, [createdAt, opts.userId, opts.songId], (err, res) => {
				if (err)
					return reject(err);

				// Create a new upvote object.
				let upvote = {
					id: res.insertId,
					created_at: createdAt,
					user_id: opts.userId,
					song_id: opts.songId
				};

				resolve(upvote);
			});
		});
	}

	// getByUserId handles getting a list of upvotes for a specific user.
	getByUserId(id) {
		return new Promise((resolve, reject) => {
			// Query the database.
			// Get from the database.
			this.db.query(getByUserIdQuery, [ id ], (err, res) => {
				if (err)
					return reject(err);

				// Create a new set of upvotes.
				let upvotes = [];

				// Loop through the results.
				res.forEach((row) => {
					// Create a new upvote object.
					let upvote = {
						id: row.id,
						created_at: row.created_at,
						user_id: row.user_id,
						song_id: row.song_id
					};

					// Append it to the upvotes set.
					upvotes.push(upvote);
				});

				resolve(upvotes);
			});
		});
	}
}

module.exports = Database;