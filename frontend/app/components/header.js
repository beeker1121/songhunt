import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// App imports.
import styles from '../styles/header.css';

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

// ConnectedHeader is the application header, which will be connected to the
// Redux store.
const ConnectedHeader = (props) => {
	let Nav;
	if (props.currentUser !== null)
		Nav = () => {
			return (
				<ul className={styles.nav}>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/account'>Account</Link></li>
				</ul>
			);
		};
	else
		Nav = () => {
			return (
				<ul className={styles.nav}>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/login'>Log In</Link></li>
					<li><Link to='/signup'>Sign Up</Link></li>
				</ul>
			);
		};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.logo}><Link to='/'>Song Hunt</Link></div>

				<Nav />
			</div>
		</div>
	);
};

// Header is the react-redux connected header component.
const Header = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);

export default Header;