import {
	GET_SONGS_SENDING, GET_SONGS_SUCCESS, GET_SONGS_ERROR,
	ADD_SONG_SENDING, ADD_SONG_SUCCESS, ADD_SONG_ERROR
} from '../actions/songs';

// initialState is the initial state for songs.
const initialState = [];

// songs is the reducer for adding songs.
const songs = (state = initialState, action = {}) => {
	switch (action.type) {
		case GET_SONGS_SENDING:
			return state;
		case GET_SONGS_SUCCESS:
			return [ ...state, ...action.songs ]
		case GET_SONGS_ERROR:
			return state;
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