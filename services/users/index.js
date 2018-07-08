// App imports.
const errors = require('../errors');
const bcrypt = require('../../cmd/app/node_modules/bcryptjs');

// validateEmail validates that an email address is in the proper format.
const validateEmail = (email) => {
	let re = /\S+@\S+/;
	return re.test(email);
}

// validateCreateOptions validates the create method options.
const validateCreateOptions = (opts) => {
	// Set opts default value to an empty object
	// if necessary, so we can check if properties
	// exist on it.
	opts = opts || {};

	// Create new OptionErrors to handle any
	// option validation errors.
	var oes = new errors.OptionErrors();

	// Validate the options.
	if (typeof opts.email === 'undefined' || opts.email === null)
		oes.add(new errors.OptionError('email', 'an email address is required'));
	else if (typeof opts.email !== 'string')
		oes.add(new errors.OptionError('email', 'email must be a string'));
	else if (opts.email === '')
		oes.add(new errors.OptionError('email', 'email cannot be empty'));
	else if (!validateEmail(opts.email))
		oes.add(new errors.OptionError('email', 'email format is invalid'));

	if (typeof opts.password === 'undefined' || opts.password === null)
		oes.add(new errors.OptionError('password', 'password cannot be empty'));
	else if (typeof opts.password !== 'string')
		oes.add(new errors.OptionError('password', 'password must be a string'));
	else if (opts.password === '')
		oes.add(new errors.OptionError('password', 'password cannot be empty'));
	else if (opts.password.length < 8)
		oes.add(new errors.OptionError('password', 'password must be greater than 8 characters'));

	if (typeof opts.confirm_password === 'undefined' || opts.confirm_password === null)
		oes.add(new errors.OptionError('confirm_password', 'confirm password cannot be empty'));
	else if (typeof opts.confirm_password !== 'string')
		oes.add(new errors.OptionError('confirm_password', 'confirm password must be a string'));
	else if (opts.confirm_password === '')
		oes.add(new errors.OptionError('confirm_password', 'confirm password cannot be empty'));
	else if (opts.confirm_password !== opts.password)
		oes.add(new errors.OptionError('confirm_password', 'passwords do not match'));

	// Return if there are option errors.
	if (oes.errors.length > 0) {
		return oes;
	}

	return;
};

// validateLoginOptions validates the login method options.
const validateLoginOptions = (opts) => {
	// Set opts default value to an empty object
	// if necessary, so we can check if properties
	// exist on it.
	opts = opts || {};

	// Create new OptionErrors to handle any
	// option validation errors.
	var oes = new errors.OptionErrors();

	// Validate the options.
	if (typeof opts.email === 'undefined' || opts.email === null)
		oes.add(new errors.OptionError('email', 'an email address is required'));
	else if (typeof opts.email !== 'string')
		oes.add(new errors.OptionError('email', 'email must be a string'));
	else if (opts.email === '')
		oes.add(new errors.OptionError('email', 'email cannot be empty'));
	else if (!validateEmail(opts.email))
		oes.add(new errors.OptionError('email', 'email format is invalid'));

	if (typeof opts.password === 'undefined' || opts.password === null)
		oes.add(new errors.OptionError('password', 'password cannot be empty'));
	else if (typeof opts.password !== 'string')
		oes.add(new errors.OptionError('password', 'password must be a string'));
	else if (opts.password === '')
		oes.add(new errors.OptionError('password', 'password cannot be empty'));

	// Return if there are option errors.
	if (oes.errors.length > 0) {
		return oes;
	}

	return;
};

// Service defines the users service.
class Service {
	constructor(db) {
		// The database service.
		this.db = db || null;
	}

	// create handles creating a new user.
	create(opts) {
		return new Promise((resolve, reject) => {
			// Validate the options.
			let oes = validateCreateOptions(opts);
			if (oes)
				return reject(oes);

			// Check if the email already exists in the database.
			this.db.users.emailExists(opts.email)
			.then((exists) => {
				if (exists)
					return reject(new errors.OptionError('email', 'email address already exists'));

				// Hash their password with bcrypt.
				let salt = bcrypt.genSaltSync(10);
				let passwordHash = bcrypt.hashSync(opts.password, salt);

				// Create the user.
				return this.db.users.create({
					email: opts.email,
					password: passwordHash
				}).then((user) => {
					resolve(user);
				}).catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}

	// getById gets a user by their ID.
	getById(id) {
		return this.db.users.getById(id);
	}

	// getUpvotes handles getting all upvotes for a user.
	getUpvotes(id) {
		return this.db.upvotes.getByUserId(id);
	}

	// login handles logging a member in.
	login(opts) {
		return new Promise((resolve, reject) => {
			// Validate the options.
			let oes = validateLoginOptions(opts);
			if (oes)
				return reject(oes);

			// Check if the email already exists in the database.
			this.db.users.getByEmail(opts.email)
			.then((user) => {
				if (!user)
					return reject(new errors.OptionError('email', 'Email and/or password is invalid'));

				// Verify password with bcrypt.
				if (!bcrypt.compareSync(opts.password, user.password))
					return reject(new errors.OptionError('email', 'Email and/or password is invalid'));

				// Return the user.
				resolve(user);
			}).catch((err) => {
				reject(err);
			});
		});
	}
}

module.exports = Service;