import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './store/index';
import App from './components/app';

// Render the main application, wrapped in the React
// BrowserRouter and Redux Provider.
render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>, document.getElementById('app')
);