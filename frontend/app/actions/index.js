// Define action types.
export const ADD_SONG = 'ADD_SONG';

// addSong is the action for adding a new song.
export const addSong = (song) => {
	return {
		type: ADD_SONG,
		payload: song
	}
}