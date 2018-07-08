// App imports.
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/user';

// currentUser is the reducer for the currentUser property of the state.
const currentUser = (state = null, action = {}) => {
	switch (action.type) {
		case USER_LOGGED_IN:
			return { token: action.token };
		case USER_LOGGED_OUT:
			return null;
		default:
			return state;
	}
};

module.exports = currentUser;