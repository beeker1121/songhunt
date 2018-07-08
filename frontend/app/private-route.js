import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state, ownProps) => {
	return {
		currentUser: state.currentUser
	};
};

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {};
};

// ConnectedPrivateRoute defines a route accessible only by logged in users.
//
// This component will receive the currentUser from the Redux state, which it
// will use to determine whether it should render the passed in component, or
// it should redirect to the login page.
const ConnectedPrivateRoute = ({ component: Component, ...rest }) => (
	<Route { ...rest } render={(props) => (
		rest.currentUser !== null
			? <Component { ...props } />
			: <Redirect to='/login' />
	)} />
);

// PrivateRoute is the react-redux connected private route component.
const PrivateRoute = connect(mapStateToProps, mapDispatchToProps)(ConnectedPrivateRoute);

export default PrivateRoute;