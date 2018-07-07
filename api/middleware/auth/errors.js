// AuthorizationError defines an API authorization error.
//
// @message string The error string to show.
class AuthorizationError extends Error {
	constructor(...params) {
		// Pass remaining params to parent constructor.
		super(...params);

		// Set the name.
		this.name = 'AuthorizationError';

		// Maintain proper stack trace (only available on V8).
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AuthorizationError);
		}
	}
};

module.exports = AuthorizationError;