// Define action types.
export const ADD_SONG_SENDING = 'ADD_SONG_SENDING';
export const ADD_SONG_SUCCESS = 'ADD_SONG_SUCCESS';
export const ADD_SONG_ERROR = 'ADD_SONG_ERROR';

// addSong is the action for adding a new song.
export const addSong = (song) => {
	return (dispatch) => {
		// Dispatch sending action.
		dispatch(addSongSending(true));

		// Create separate variable outside of fetch scope
		// to store response.ok boolean, since we don't want
		// to get into Promise-land hell.
		let resOk;

		// Call the API.
		fetch('/api/songs', {
			method: 'POST',
			body: JSON.stringify(song),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			// Store the ok boolean of the response.
			resOk = res.ok;

			// Parse response body as JSON.
			//
			// We use a promise here since the .json() method reads
			// in the response body in a returned Promise.
			return res.json();
		}).then((data) => {
			// Check if there was an HTTP code error
			// (res.ok checks if 200 <= res.statusCode <= 299).
			if (!resOk) {
				console.log("sending errors: " + JSON.stringify(data.errors));
				dispatch(addSongError(data.errors));
				return;
			}

			console.log("success");
			console.log(JSON.stringify(data));
			dispatch(addSongSuccess(data));
		}).catch((err) => {
			// There was a network or some other fetch error,
			// or, there was a res.json() parse error. Either
			// way, wrap it in an expected error response
			// format and return an internal server error.
			let data = {
				errors: [{
					status: 500,
					detail: "Internal server error"
				}]
			};

			dispatch(addSongError(data));
		})
	}
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