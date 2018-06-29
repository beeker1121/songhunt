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
		this.errors = apiErrors || [];
	}

	// add appends an API error.
	add(apiError) {
		this.errors.push(apiError);
	}
}

// default returns a default API error response.
//
// @req      object   The HTTP request object.
// @res      object   The HTTP response object.
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
	// Create error in proper format.
	let error = {
		status: apiError.status,
		param: apiError.paramName,
		detail: apiError.message
	}

	// If paramName is null or undefined,
	// delete it.
	if (typeof apiError.paramName === 'undefined' || apiError.paramName === null)
		delete error.param;

	// Set the status code and return the error.
	res.statusCode = apiError.status;
	res.json({
		errors: [error]
	});
}

// multiple returns an API error response with multiple errors.
//
// @req       object    The HTTP request object.
// @res       object    The HTTP response object.
// @apiErrors APIErrors The set of API errors.
const multipleErrors = (req, res, apiErrors) => {
	// Create array to hold formatted errors.
	var errors = [];

	apiErrors.errors.forEach((err) => {
		// Create error in proper format.
		let error = {
			status: err.status,
			param: err.paramName,
			detail: err.message
		};

		// If paramName is null or undefined,
		// delete it.
		if (typeof err.paramName === 'undefined' || err.paramName === null)
			delete error.param;

		errors.push(error);
	});

	// Set the status code and return the error.
	res.statusCode = apiErrors.status
	res.json({
		errors: errors
	});
}

module.exports = {
	APIError,
	APIErrors,
	defaultError,
	multipleErrors
};