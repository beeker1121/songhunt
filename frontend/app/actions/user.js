// Define action types.
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const USER_UPVOTES_SUCCESS = 'USER_UPVOTES_SUCCESS';

// userLoggedIn is the action for signaling a user has logged in.
export const userLoggedIn = (token) => {
	return {
		type: USER_LOGGED_IN,
		token
	};
}

// userLoggedOut is the action for signaling a user has logged out.
export const userLoggedOut = () => {
	return {
		type: USER_LOGGED_OUT
	};
}

// userUpvotesSuccess is the action for signaling the upvotes for a user have
// been requested successfully.
export const userUpvotesSuccess = (upvotes) => {
	return {
		type: USER_UPVOTES_SUCCESS,
		upvotes
	};
}