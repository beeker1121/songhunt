import { ADD_SONG } from '../actions/index';

// initialState is the initial state of the Redux store.
const initialState = {
	songs: []
};

// rootReducer is the root reducer of the Redux store.
const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_SONG:
			return { ...state, songs: [...state.songs, action.payload] };
		default:
			return state;
	}
}

export default rootReducer;