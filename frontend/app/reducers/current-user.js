// App imports.
import { USER_LOGGED_IN, USER_LOGGED_OUT, GET_USER_UPVOTES_SUCCESS } from '../actions/user';
import { UPVOTE_SUCCESS, UNVOTE_SUCCESS } from '../actions/songs';

// handleUserLoggedIn handles the user logged in action.
const handleUserLoggedIn = (state, action) => {
	return { token: action.token };
}

// handleGetUserUpvotesSuccess handles creating a map of upvoted songs by ID
// from the response of the user upvotes success action.
//
// This is stored alongside the JWT token in the currentUser property of the
// Redux state. It will be in the form of:
//
// currentUser: {
//   token: ...,
//   upvotes: {
//     123: true,
//     124: true
//   }
// }
//
// Where each propeprty of the upvotes object is a song ID, and it being in the
// map means this song has been upvoted by this user.
const handleGetUserUpvotesSuccess = (state, action) => {
	// Create the map of upvotes by song ID.
	let upvotes = {};

	// Loop through the action upvotes array.
	action.upvotes.forEach((upvote) => {
		upvotes[upvote.song_id] = true;
	});

	// Return the new upvotes state.
	return { ...state, upvotes };
}

// handleUpvoteSuccess handles adding the newly upvoted song to the user
// upvotes map.
const handleUpvoteSuccess = (state, action) => {
	// Return the new upvotes state.
	return {
		...state,
		upvotes: {
			...state.upvotes,
			[action.id]: true
		}
	};
}

// handleUnvoteSuccess handles remove the unvoted song from the user upvotes
// map.
const handleUnvoteSuccess = (state, action) => {
	// Copy the upvotes state map.
	let newUpvotes = { ...state.upvotes };

	// Remove this song from the map.
	delete newUpvotes[action.id];

	// Return the new upvotes state.
	return {
		...state,
		upvotes: newUpvotes
	};
}

// currentUser is the reducer for the currentUser property of the state.
const currentUser = (state = null, action = {}) => {
	switch (action.type) {
		case USER_LOGGED_IN:
			return handleUserLoggedIn(state, action);
		case USER_LOGGED_OUT:
			return null;
		case GET_USER_UPVOTES_SUCCESS:
			return handleGetUserUpvotesSuccess(state, action);
		case UPVOTE_SUCCESS:
			return handleUpvoteSuccess(state, action);
		case UNVOTE_SUCCESS:
			return handleUnvoteSuccess(state, action);
		default:
			return state;
	}
};

// Redux state layout:
//
// {
//   ...state,
//   currentUser: {
//     token: 'alkj39avma0983a.a09vja3.a098vja'
//     upvotes: [1, 2, 3]
//   }
// }
//
// Where the 'upvotes' property stores the song IDs upvotes by the user.
module.exports = currentUser;