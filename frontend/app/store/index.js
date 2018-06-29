import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// App imports.
import rootReducer from '../reducers';

// Create our Redux store.
//
// We use the applyMiddleware enhancer (third argument to createStore) by
// itself, as this enhancer function ships with Redux.
const store = createStore(
	rootReducer,
	{},
	applyMiddleware(thunk)
);

export default store;