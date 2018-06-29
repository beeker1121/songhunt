import React from 'react';
import { Switch, Route } from 'react-router-dom';

// App imports.
import Home from './components/home';
import About from './components/about';

// Routes handles creating and showing the application routes.
const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/about' component={About} />
		</Switch>
	);
};

export default Routes;