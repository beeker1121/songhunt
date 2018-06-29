// App imports.
const errors = require('../errors');
const servicesErrors = require('../../services/errors');

// errorHandler is middleware for handling API errors.
//
// This function implements the signature express expects for error handling
// middleware, i.e. function(err, req, res, next).
const errorHandler = (err, req, res, next) => {
	// If this is an APIError error class.
	if (err instanceof errors.APIError) {
		errors.defaultError(req, res, err);
		return;
	}

	// If this is an APIErrors error class.
	if (err instanceof errors.APIErrors) {
		errors.multipleErrors(req, res, err);
		return;
	}

	// If this is an OptionsErrors error class.
	if (err instanceof servicesErrors.OptionErrors) {
		// Create new APIErrors with the status code
		// set to 400 (bad request).
		var apiErrors = new errors.APIErrors(400);

		// Loop through each option error and add
		// it to the API errors array.
		err.errors.forEach((oe) => {
			apiErrors.add(new errors.APIError(400, oe.optionName, oe.message));
		});

		errors.multipleErrors(req, res, apiErrors);
		return;
	}

	// If we got here, return an internal server error.
	errors.defaultError(req, res,
		new errors.APIError(500, null, "Internal server error"));
}

module.exports = errorHandler;