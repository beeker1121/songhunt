// Define the SQL queries used in methods.
const createQuery = `
INSERT INTO songhunt.users
SET created_at=?,
	email=?,
	password=?
`;

const emailExistsQuery = `
SELECT email
FROM songhunt.users
WHERE email=?
`;

// Database defines the users database.
class Database {
	constructor(db) {
		this.db = db || null;
	}

	// create handles creating a new member.
	create(opts) {
		return new Promise((resolve, reject) => {
			// Set the created at time.
			let createdAt = new Date();

			// Save to the database.
			this.db.query(createQuery, [createdAt, opts.email, opts.password], (err, res) => {
				if (err)
					return reject(err);

				// Create a new user object.
				let user = {
					id: res.insertId,
					created_at: createdAt,
					email: opts.email
				};

				resolve(user);
			});
		});
	}

	// emailExists checks if the given email already exists in the database.
	emailExists(email) {
		return new Promise((resolve, reject) => {
			// Query the database.
			this.db.query(emailExistsQuery, [email], (err, res) => {
				if (err)
					return reject(err);

				// Check result length.
				if (res.length > 0)
					resolve(true);
				else
					resolve(false);
			});
		});
	}
}

module.exports = Database;