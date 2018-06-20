import { createStore } from 'redux';
import rootReducer from '../reducers/index';

// Create our Redux store.
const store = createStore(rootReducer);

export default store;