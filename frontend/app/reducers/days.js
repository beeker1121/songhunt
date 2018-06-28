import { combineReducers } from 'redux';

// App imports.
import {
	GET_SONGS_SENDING, GET_SONGS_SUCCESS, GET_SONGS_ERROR,
	ADD_SONG_SENDING, ADD_SONG_SUCCESS, ADD_SONG_ERROR
} from '../actions/songs';

// handleGetSongsById handles normalizing the response of the get songs action
// into the byId section of the days state table.
const handleGetSongsById = (state, action) => {
	// Get the id for the next day.
	let nextDayId = 0;

	// Create a 'row' for the next day.
	let day = {
		songs: []
	}

	// Loop through each song and append its
	// id to the day's songs array.
	action.songs.forEach((song) => {
		day.songs.push(song.id);
	})

	// Return state with the new day added.
	return {
		...state,
		[nextDayId]: day
	};
}

// handleAddSongById handles normalizing the response of the add song action
// into the byId section of the days state table.
const handleAddSongById = (state, action) => {
	// Assuming the current day has been loaded
	// already here, for now, just return the
	// state with the song added to the day at
	// the 0 index.
	return {
		...state,
		0: {
			songs: [ ...state[0].songs, action.song.id ]
		}
	};
}

// daysById is the reducer for the byId section of the days state table.
const daysById = (state = {}, action = {}) => {
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

// days is the reducer for the days state table.
const days = combineReducers({
	byId: daysById
});

module.exports = days;