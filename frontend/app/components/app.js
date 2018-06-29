import React from 'react';

// App imports.
import Header from './header';
import Routes from '../routes';
import '../styles/style.css';

// App is the main application component. The header component renders above
// the Routes component, which handles rendering the various pages.
const App = () => {
	return (
		<div>
			<Header />
			<Routes />
		</div>
	);
};

export default App;