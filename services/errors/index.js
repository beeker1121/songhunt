// OptionError defines a service method option error.
//
// @optionName string The name of the option that caused the error.
// @message    string The error string to show.
class OptionError extends Error {
	constructor(optionName, ...params) {
		// Pass remaining params to parent constructor.
		super(...params);

		// Set the name.
		this.name = 'OptionError';

		// Maintain proper stack trace (only available on V8).
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, OptionError);
		}

		// Set the properties.
		this.optionName = optionName;
	}
}

// OptionErrors defines a set of option errors.
//
// @optionErrors array.OptionError An array of otpion errors.
class OptionErrors extends Error {
	constructor(optionErrors, ...params) {
		// Pass remaining params to parent constructor.
		super(...params);

		// Set the name.
		this.name = 'OptionErrors';

		// Maintain proper stack trace (only available on V8).
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, OptionErrors);
		}

		// Set the properties.
		this.errors = optionErrors || [];
	}

	// add appends an option error.
	add(optionError) {
		this.errors.push(optionError);
	}
}

module.exports = {
	OptionError,
	OptionErrors
};