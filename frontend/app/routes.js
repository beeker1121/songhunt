import React from 'react';
import { Switch, Route } from 'react-router-dom';

// App imports.
import PrivateRoute from './private-route';
import Home from './components/home';
import About from './components/about';
import LogIn from './components/log-in';
import SignUp from './components/sign-up';
import Account from './components/account';

// Routes handles creating and showing the application routes.
const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/about' component={About} />
			<Route exact path='/login' component={LogIn} />
			<Route exact path='/signup' component={SignUp} />
			<PrivateRoute exact path='/account' component={Account} />
		</Switch>
	);
};

export default Routes;