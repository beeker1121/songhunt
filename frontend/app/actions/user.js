// Define action types.
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const GET_USER_UPVOTES_SUCCESS = 'GET_USER_UPVOTES_SUCCESS';

// userLoggedIn is the action for signaling a user has logged in.
export const userLoggedIn = (token) => {
	// Add token to localStorage.
	localStorage.setItem('token', token);

	return {
		type: USER_LOGGED_IN,
		token
	};
}

// userLoggedOut is the action for signaling a user has logged out.
export const userLoggedOut = () => {
	// Remove token from localStorage.
	localStorage.removeItem('token');

	return {
		type: USER_LOGGED_OUT
	};
}

// getUserUpvotes is the action for getting a list of user upvotes.
export const getUserUpvotes = (token) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			// Create separate variable outside of fetch scope
			// to store response.ok boolean, since we don't want
			// to get into Promise-land hell.
			let resOk;

			// Call the API.
			fetch('/api/upvotes', {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + token
				}
			}).then((res) => {
				// Store the ok boolean of the response.
				resOk = res.ok;

				// Parse response body as JSON.
				//
				// We use a promise here since the .json() method reads
				// in the response body in a returned Promise.
				return res.json();
			}).then((res) => {
				// Check if there was an HTTP code error
				// (res.ok checks if 200 <= res.statusCode <= 299).
				if (!resOk) {
					return reject();
				}

				// Dispatch success action.
				dispatch(getUserUpvotesSuccess(res.data));
				resolve();
			}).catch((err) => {
				// There was a network or some other fetch error,
				// or, there was a res.json() parse error. Either
				// way, wrap it in the expected error response
				// format and return an internal server error.
				reject();
			});
		});
	}
}

// getUserUpvotesSuccess is the action for signaling the upvotes for a user
// have been requested successfully.
export const getUserUpvotesSuccess = (upvotes) => {
	return {
		type: GET_USER_UPVOTES_SUCCESS,
		upvotes
	};
}