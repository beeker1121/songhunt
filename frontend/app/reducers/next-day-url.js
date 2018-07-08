import { combineReducers } from 'redux';

// App imports.
import { SET_NEXT_DAY_URL } from '../actions/songs';

// nextDayUrl is the reducer for the nextDayUrl property of the state.
const nextDayUrl = (state = "http://104.197.141.188/api/songs?days_ago=0", action = {}) => {
	switch (action.type) {
		case SET_NEXT_DAY_URL:
			return action.nextDayUrl;
		default:
			return state;
	}
};

module.exports = nextDayUrl;