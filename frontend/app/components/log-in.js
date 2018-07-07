import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import styles from '../styles/log_in.css';
import gStyles from '../styles/style.css';

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
	return {};
};

// ConnectedLogIn is the log in page component, which will be connected to
// the Redux store.
class ConnectedLogIn extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();

		// Create form state.
		this.state = {
			email: '',
			password: '',
			errors: {
				email: '',
				password: ''
			}
		};

		// Set 'this' scope to this class for methods.
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			...this.state,
			[event.target.id]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		// Reset errors.
		this.setState({
			...this.state,
			errors: {
				email: '',
				password: ''
			}
		});

		// Set the user
		let user = { ...this.state };

		// Create separate variable outside of fetch scope
		// to store response.ok boolean, since we don't want
		// to get into Promise-land hell.
		let resOk;
		let resStatusCode;

		// Call the API.
		fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			// Store the ok boolean of the response.
			resOk = res.ok;
			resStatusCode = res.status;

			// Parse response body as JSON.
			//
			// We use a promise here since the .json() method reads
			// in the response body in a returned Promise.
			return res.json();
		}).then((res) => {
			// Check if there was an HTTP code error
			// (res.ok checks if 200 <= res.statusCode <= 299).
			if (!resOk) {
				// Create a copy of the state.
				let newState = { ...this.state };

				// If response is a 400 Bad Request.
				if (resStatusCode === 400) {
					// Loop through the errors and add to state.
					res.errors.forEach((err) => {
						newState.errors[err.param] = err.detail;
					});
				}

				this.setState(newState);
				return;
			}

			// Dispatch success action.
			//this.props.logInSuccess(res.data);

			// Reset state.
			this.setState({
				...this.state,
				email: '',
				password: ''
			});
		}).catch((err) => {
			// There was a network or some other fetch error,
			// or, there was a res.json() parse error. Either
			// way, wrap it in the expected error response
			// format set to the confirm_password parameter.
			this.setState({
				...this.state,
				errors: {
					...this.state.errors,
					confirm_password: 'Internal server error'
				}
			});
		});
	}

	render() {
		return (
			<div className={styles.log_in}>
				<form onSubmit={this.handleSubmit} noValidate>
					<h3>Log in to Song Hunt</h3>

					<label htmlFor="email">Email Address</label>
					<input type="email" id="email" name="email" className={`${gStyles.sh_input}`} value={this.state.email} onChange={this.handleChange} />
					{this.state.errors.email !== '' &&
						<span className={gStyles.param_error}>{this.state.errors.email}</span>
					}

					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" className={`${gStyles.sh_input}`} value={this.state.password} onChange={this.handleChange} />
					{this.state.errors.password !== '' &&
						<span className={gStyles.param_error}>{this.state.errors.password}</span>
					}

					<button type="submit" className={`${gStyles.sh_btn} ${styles.btn}`}>Log In</button>
				</form>
			</div>
		);
	}
}

// Ensure prop types.
ConnectedLogIn.propTypes = {};

// LogIn is the react-redux connected sign up component.
const LogIn = connect(null, mapDispatchToProps)(ConnectedLogIn);

export default LogIn;