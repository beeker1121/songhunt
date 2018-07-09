import { combineReducers } from 'redux';

// App imports.
import config from '../config';
import { SET_NEXT_DAY_URL } from '../actions/songs';

// nextDayUrl is the reducer for the nextDayUrl property of the state.
const nextDayUrl = (state = config.scheme + '://' + config.host + '/api/songs?days_ago=0', action = {}) => {
	switch (action.type) {
		case SET_NEXT_DAY_URL:
			return action.nextDayUrl;
		default:
			return state;
	}
};

module.exports = nextDayUrl;