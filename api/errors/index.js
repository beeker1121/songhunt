// APIError defines an API error.
//
// @status    int    The HTTP status code to return.
// @paramName string If the error includes a parameter, use this to define it.
// @message   string The error string to show.
class APIError extends Error {
	constructor(status = 500, paramName, ...params) {
		// Pass remaining params to parent constructor.
		super(...params);

		// Set the name.
		this.name = 'APIError';

		// Maintain proper stack trace (only available on V8).
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, APIError);
		}

		// Set the properties.
		this.status = status;
		this.paramName = paramName;
	}
}

// APIErrors defines a set of API errors.
//
// @status    int            The HTTP status code to return.
// @apiErrors array.APIError An array of API errors.
class APIErrors extends Error {
	constructor(status = 500, apiErrors, ...params) {
		// Pass remaining params to parent constructor.
		super(...params);

		// Set the name.
		this.name = 'APIErrors';

		// Maintain proper stack trace (only available on V8).
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, APIErrors);
		}

		// Set the properties.
		this.status = status;
		this.apiErrors = apiErrors || [];
	}
}

// default returns a default API error response.
//
// @apiError APIError The API error.
//
// The response will be in the format of:
//
// {
//   errors: [{
//     status: 400,
//     detail: "The given endpoint could not be found"
//   }]
// }
const defaultError = (req, res, apiError) => {
	// Set the status code and return the error.
	res.statusCode = apiError.status;
	res.json({
		errors: [{
			status: apiError.status,
			detail: apiError.message
		}]
	});
}

// multiple returns an API error response with multiple errors.
//
// @apiErrors APIErrors The set of API errors.
const multipleErrors = (req, res, apiErrors) => {
	// Format the error output.
	var errors = [];

	apiErrors.forEach((err) => {
		let error = {
			status: err.status,
			param: err.paramName,
			detail: err.message
		};

		errors.push(error);
	});

	// Set the status code and return the error.
	res.statusCode = apiErrors.status
	res.json({
		errors: errors
	});
}

module.exports = { APIError, APIErrors, defaultError, multipleErrors };