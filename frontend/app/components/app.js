import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// App imports.
import Header from './header';
import Routes from '../routes';
import { userLoggedIn, getUserUpvotes } from '../actions/user';
import '../styles/style.css';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state, ownProps) => {
	return {};
};

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {
		userLoggedIn: (token) => dispatch(userLoggedIn(token)),
		getUserUpvotes: (token) => dispatch(getUserUpvotes(token))
	};
};

// ConnectedApp is the main application component. The header component renders
// above the Routes component, which handles rendering the various pages. This
// component will be connected to the Redux store.
class ConnectedApp extends React.Component {
	constructor(props) {
		// Get access to 'this' as subclass.
		super(props);

		// Check localStorage for existing token.
		let token = localStorage.getItem('token');

		// If token exists, log this user in.
		if (token) {
			this.props.userLoggedIn(token);
			this.props.getUserUpvotes(token);
		}
	}

	render() {
		return (
			<div>
				<Header />
				<Routes />
			</div>
		);
	}
}

// Ensure prop types.
ConnectedApp.propTypes = {};

// App is the react-redux connected main application component.
const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

// Wrap with withRouter so the App component is aware of location changes,
// which will cause its children with specific routes to re-render as they
// should, and stop the update blocking bug.
export default withRouter(App);