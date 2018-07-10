import { combineReducers } from 'redux';

// App imports.
import {
	GET_SONGS_SENDING, GET_SONGS_SUCCESS, GET_SONGS_ERROR,
	ADD_SONG_SENDING, ADD_SONG_SUCCESS, ADD_SONG_ERROR,
	UPVOTE_SUCCESS, UNVOTE_SUCCESS,
	GET_SONG_EMBED_HTML_SUCCESS, GET_SONG_EMBED_HTML_ERROR
} from '../actions/songs';

// handleGetSongsSuccessById handles normalizing the response of the get songs
// success action into the byId section of the songs state table.
const handleGetSongsSuccessById = (state, action) => {
	// Copy over state.
	let newState = { ...state };

	// Loop through each song.
	action.songs.forEach((song) => {
		// Add the embedHtml and embedHtmlError
		// properties to the song object.
		song.embedHtml = '';
		song.embedHtmlError = '';

		// Add this song to the state table.
		newState[song.id] = song;
	});

	return newState;
};

// handleAddSongSuccessById handles normalizing the response of the add song
// success action into the byId section of the songs state table.
const handleAddSongSuccessById = (state, action) => {
	let song = action.song;

	// Add the embedHtml and embedHtmlError
	// properties to the song object.
	song.embedHtml = '';
	song.embedHtmlError = '';

	return {
		...state,
		[song.id]: song
	};
}

// handleUpvoteSuccessById handles normalizing the response of the upvote
// success action into the byId section of the songs state table.
const handleUpvoteSuccessById = (state, action) => {
	// Pull a copy of the song from state.
	let song = { ...state[action.id] };

	// Increment song upvotes.
	song.upvotes++;

	return {
		...state,
		[action.id]: song
	};
}

// handleUnvoteSuccessById handles normalizing the response of the unvote
// success action into the byId section of the songs state table.
const handleUnvoteSuccessById = (state, action) => {
	// Pull a copy of the song from state.
	let song = { ...state[action.id] };

	// Decrement song upvotes.
	song.upvotes--;

	return {
		...state,
		[action.id]: song
	};
}

// handleGetSongEmbedHtmlSuccessById handles normalizing the response of the
// get song embed html success action into the byId section of the songs table.
const handleGetSongEmbedHtmlSuccessById = (state, action) => {
	// Pull a copy of the song from state.
	let song = { ...state[action.id] };

	// Update the embedHtml and embedHtmlError properties.
	song.embedHtml = action.embedHtml;
	song.embedHtmlError = '';

	return {
		...state,
		[action.id]: song
	};
}

// handleGetSongEmbedHtmlErrorById handles normalizing the response of the get
// song embed html error action into the byId section of the songs table.
const handleGetSongEmbedHtmlErrorById = (state, action) => {
	// Pull a copy of the song from state.
	let song = { ...state[action.id] };

	// Update the embedHtml and embedHtmlError properties.
	song.embedHtml = '';
	song.embedHtmlError = action.embedHtmlError;

	return {
		...state,
		[action.id]: song
	};
}

// songsById is the reducer for the byId section of the songs state table.
const songsById = (state = {}, action = {}) => {
	switch (action.type) {
		case GET_SONGS_SUCCESS:
			return handleGetSongsSuccessById(state, action);
		case ADD_SONG_SUCCESS:
			return handleAddSongSuccessById(state, action);
		case UPVOTE_SUCCESS:
			return handleUpvoteSuccessById(state, action);
		case UNVOTE_SUCCESS:
			return handleUnvoteSuccessById(state, action);
		case GET_SONG_EMBED_HTML_SUCCESS:
			return handleGetSongEmbedHtmlSuccessById(state, action);
		case GET_SONG_EMBED_HTML_ERROR:
			return handleGetSongEmbedHtmlErrorById(state, action);
		default:
			return state;
	}
}

// handleGetSongsSuccessAllIds handles normalizing the response of the get
// songs success action into the allIds section of the songs state table.
const handleGetSongsSuccessAllIds = (state, action) => {
	// Copy over state.
	let newState = [ ...state ];

	// Loop through each song.
	action.songs.forEach((song) => {
		// Add this song's id to the state table.
		newState.push(song.id);
	});

	return newState;
};

// handleAddSongSuccessAllIds handles normalizing the response of the add song
// success action into the allIds section of the songs state table.
const handleAddSongSuccessAllIds = (state, action) => {
	return [ ...state, action.song.id ];
}

// songsAllIds is the reducer for the allIds section of the songs state table.
const songsAllIds = (state = {}, action = {}) => {
	switch (action.type) {
		case GET_SONGS_SUCCESS:
			return handleGetSongsSuccessAllIds(state, action);
		case ADD_SONG_SUCCESS:
			return handleAddSongSuccessAllIds(state, action);
		default:
			return state;
	}
}

// songs is the reducer for the songs state table.
//
// Redux state layout:
//
// {
//   ...state,
//   songs: {
//     byId: {
//       1: {
//         id: 1,
//         title: "Hours",
//         artist: "Billboard",
//         ...
//         comments: [1, 2],
//         upvotes: 123
//       }
//     },
//     allIds: [1]
//   }
// }
const songs = combineReducers({
	byId: songsById,
	allIds: songsAllIds
});

module.exports = songs;