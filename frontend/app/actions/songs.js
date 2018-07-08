// Define action types.
export const GET_SONGS_SENDING = 'GET_SONGS_SENDING';
export const GET_SONGS_SUCCESS = 'GET_SONGS_SUCCESS';
export const GET_SONGS_ERROR = 'GET_SONGS_ERROR';

export const ADD_SONG_SENDING = 'ADD_SONG_SENDING';
export const ADD_SONG_SUCCESS = 'ADD_SONG_SUCCESS';
export const ADD_SONG_ERROR = 'ADD_SONG_ERROR';

export const UPVOTE_SUCCESS = 'UPVOTE_SUCCESS';

export const GET_SONG_EMBED_HTML_SUCCESS = 'GET_SONG_EMBED_HTML_SUCCESS';
export const GET_SONG_EMBED_HTML_ERROR = 'GET_SONG_EMBED_HTML_ERROR';

export const SET_NEXT_DAY_URL = 'SET_NEXT_DAY_URL';

// getSongs is the action for getting a list of songs.
export const getSongs = (nextDayUrl) => {
	return (dispatch) => {
		// Dispatch sending action.
		dispatch(getSongsSending(true));

		// Create separate variable outside of fetch scope
		// to store response.ok boolean, since we don't want
		// to get into Promise-land hell.
		let resOk;

		// Call the API.
		fetch(nextDayUrl, {
			method: 'GET'
		}).then((res) => {
			// Store the ok boolean of the response.
			resOk = res.ok;

			// Parse response body as JSON.
			//
			// We use a promise here since the .json() method reads
			// in the response body in a returned Promise.
			return res.json();
		}).then((res) => {
			// Check if there was an HTTP code error
			// (res.ok checks if 200 <= res.statusCode <= 299).
			if (!resOk) {
				dispatch(getSongsError(res.errors));
				return;
			}

			// Dispatch success action.
			dispatch(getSongsSuccess(res.data));

			// Dispatch action to update next day URL.
			dispatch(setNextDayUrl(res.links.next));
		}).catch((err) => {
			// There was a network or some other fetch error,
			// or, there was a res.json() parse error. Either
			// way, wrap it in the expected error response
			// format and return an internal server error.
			let data = {
				errors: [{
					status: 500,
					detail: "Internal server error"
				}]
			};

			// Dispatch error action.
			dispatch(getSongsError(data));
		});
	}
}

// getSongsSending is the action for signaling a list of songs is being
// requested from the API.
export const getSongsSending = (bool) => {
	return {
		type: GET_SONGS_SENDING,
		isGettingSongs: bool
	};
}

// getSongsSuccess is the action for signaling a list of songs has been
// successfully requested from the API.
export const getSongsSuccess = (songs) => {
	return {
		type: GET_SONGS_SUCCESS,
		songs
	};
}

// getSongsError is the action for signaling an error was encountered while
// requesting a list of songs from the API.
export const getSongsError = (errors) => {
	return {
		type: GET_SONGS_ERROR,
		errors
	};
}

// addSongSending is the action for signaling a new song is being sent to the
// API.
export const addSongSending = (bool) => {
	return {
		type: ADD_SONG_SENDING,
		isSendingSong: bool
	};
}

// addSongSuccess is the action for signaling a new song has been successfully
// added.
export const addSongSuccess = (song) => {
	return {
		type: ADD_SONG_SUCCESS,
		song
	};
}

// addSongError is the action for signaling an error was encountered while
// adding a new song.
export const addSongError = (errors) => {
	return {
		type: ADD_SONG_ERROR,
		errors
	};
}

// upvoteSuccess is the action for signaling a song has been successfully
// upvoted.
export const upvoteSuccess = (id) => {
	return {
		type: UPVOTE_SUCCESS,
		id
	};
}

// getSongEmbedHtmlSuccess is the action for signaling the embed HTML for a
// song has been successfully requested.
export const getSongEmbedHtmlSuccess = (id, embedHtml) => {
	return {
		type: GET_SONG_EMBED_HTML_SUCCESS,
		id,
		embedHtml
	};
}

// setNextDayUrl is the action for setting the next day URL the API should call
// to pull the next day's list of songs.
export const setNextDayUrl = (nextDayUrl) => {
	return {
		type: SET_NEXT_DAY_URL,
		nextDayUrl
	};
}