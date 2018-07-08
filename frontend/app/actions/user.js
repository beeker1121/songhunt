// Define action types.
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

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