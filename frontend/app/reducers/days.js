import { combineReducers } from 'redux';

// App imports.
import {
	GET_SONGS_SENDING, GET_SONGS_SUCCESS, GET_SONGS_ERROR,
	ADD_SONG_SENDING, ADD_SONG_SUCCESS, ADD_SONG_ERROR
} from '../actions/songs';

// handleGetSongsSuccessById handles normalizing the response of the get songs
// success action into the byId section of the days state table.
const handleGetSongsSuccessById = (state, action) => {
	// Get the id for the next day.
	let nextDayId = Object.keys(state).length || 0;

	// Create a 'row' for the next day.
	let day = {
		songs: [],
		songsOrderedByUpvotes: []
	}

	// Loop through each song and append its
	// id to the day's songs array.
	action.songs.forEach((song) => {
		day.songs.push(song.id);
	});

	// Create two columned array to hold song
	// IDs and their upvote counts.
	let songsIDsAndUpvotes = [];
	action.songs.forEach((song) => {
		songsIDsAndUpvotes.push([ song.id, song.upvotes ]);
	});

	// Sort it.
	songsIDsAndUpvotes.sort((a, b) => b[1] - a[1]);

	// Loop through so we can add the ordered
	// song IDs to state.
	songsIDsAndUpvotes.forEach((song) => {
		day.songsOrderedByUpvotes.push(song[0]);
	})

	// Return state with the new day added.
	return {
		...state,
		[nextDayId]: day
	};
};

// handleAddSongSuccessById handles normalizing the response of the add song
// success action into the byId section of the days state table.
const handleAddSongSuccessById = (state, action) => {
	// Assuming the current day has been loaded
	// already here, for now, just return the
	// state with the song added to the day at
	// the 0 index, and prepend the new ID to
	// the ordered array so it shows up top.
	return {
		...state,
		0: {
			songs: [ ...state[0].songs, action.song.id ],
			songsOrderedByUpvotes: [ action.song.id, ...state[0].songsOrderedByUpvotes ]
		}
	};
};

// daysById is the reducer for the byId section of the days state table.
const daysById = (state = {}, action = {}) => {
	switch (action.type) {
		case GET_SONGS_SUCCESS:
			return handleGetSongsSuccessById(state, action);
		case ADD_SONG_SUCCESS:
			return handleAddSongSuccessById(state, action);
		default:
			return state;
	}
};

// handleGetSongsSuccessAllIds handles normalizing the response of the get songs
// success action into the allIds section of the days state table.
const handleGetSongsSuccessAllIds = (state, action) => {
	// Get the id for the next day.
	let nextDayId = state.length || 0;

	// Return state with the new day id added.
	return [ ...state, nextDayId ];
};

// daysAllIds is the reducer for the allIds section of the days state table.
const daysAllIds = (state = [], action = {}) => {
	switch (action.type) {
		case GET_SONGS_SUCCESS:
			return handleGetSongsSuccessAllIds(state, action);
		default:
			return state;
	}
};

// days is the reducer for the days state table.
//
// Redux state layout:
//
// {
//   ...state,
//   days: {
//     byId: {
//       0: {
//         songs: [1, 2]
//       }
//     },
//     allIds: [0]
//   }
// }
//
// Where the 'songs' property stores the song IDs for the given day, and the
// 'allIds' property stores all of the day IDs.
const days = combineReducers({
	byId: daysById,
	allIds: daysAllIds
});
module.exports = days;