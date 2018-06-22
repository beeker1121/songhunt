import { ADD_SONG_SENDING, ADD_SONG_SUCCESS, ADD_SONG_ERROR } from '../actions/songs';

// initialState is the initial state for songs.
const initialState = [];

// songs is the songs reducer.
const songs = (state = initialState, action = {}) => {
	switch (action.type) {
		case ADD_SONG_SENDING:
			return state;
		case ADD_SONG_SUCCESS:
			return [ ...state, action.song ];
		case ADD_SONG_ERROR:
			return state;
		default:
			return state;
	}
}

module.exports = songs;