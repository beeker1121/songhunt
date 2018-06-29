import { combineReducers } from 'redux';

// App imports.
import {
	GET_SONGS_SENDING, GET_SONGS_SUCCESS, GET_SONGS_ERROR,
	ADD_SONG_SENDING, ADD_SONG_SUCCESS, ADD_SONG_ERROR
} from '../actions/songs';

// handleGetSongsById handles normalizing the response of the get songs action
// into the byId section of the songs state table.
const handleGetSongsById = (state, action) => {
	// Copy over state.
	let newState = { ...state };

	// Loop through each song.
	action.songs.forEach((song) => {
		// Add this song to state table.
		newState[song.id] = song;
	});

	return newState;
};

// handleAddSongById handles normalizing the response of the add song action
// into the byId section of the songs state table.
const handleAddSongById = (state, action) => {
	let song = action.song;

	return {
		...state,
		[song.id]: song
	};
}

// songsById is the reducer for the byId section of the songs state table.
const songsById = (state = {}, action = {}) => {
	switch (action.type) {
		case GET_SONGS_SENDING:
			return state;
		case GET_SONGS_SUCCESS:
			return handleGetSongsById(state, action);
		case GET_SONGS_ERROR:
			return state;
		case ADD_SONG_SENDING:
			return state;
		case ADD_SONG_SUCCESS:
			return handleAddSongById(state, action);
		case ADD_SONG_ERROR:
			return state;
		default:
			return state;
	}
}

// songs is the reducer for the songs state table.
const songs = combineReducers({
	byId: songsById
});

module.exports = songs;