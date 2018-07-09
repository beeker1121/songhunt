import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import { userLoggedIn } from '../actions/user';
import styles from '../styles/sign_up.css';
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
	return {
		userLoggedIn: (token) => dispatch(userLoggedIn(token))
	};
};

// ConnectedSignUp is the sign up page component, which will be connected to
// the Redux store.
class ConnectedSignUp extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();

		// Create form state.
		this.state = {
			email: '',
			password: '',
			confirm_password: '',
			errors: {
				email: '',
				password: '',
				confirm_password: ''
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
				password: '',
				confirm_password: ''
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
		fetch('/api/signup', {
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

			// Dispatch logged in action.
			this.props.userLoggedIn(res.data.token);

			// Reset state.
			this.setState({
				...this.state,
				email: '',
				password: '',
				confirm_password: ''
			});

			this.props.history.push('/');
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
			<div className={styles.sign_up}>
				<form onSubmit={this.handleSubmit} noValidate>
					<h3>Sign up to Song Hunt</h3>

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

					<label htmlFor="confirm_password">Confirm Password</label>
					<input type="password" id="confirm_password" name="confirm_password" className={`${gStyles.sh_input}`} value={this.state.confirm_password} onChange={this.handleChange} />
					{this.state.errors.confirm_password !== '' &&
						<span className={gStyles.param_error}>{this.state.errors.confirm_password}</span>
					}

					<button type="submit" className={`${gStyles.sh_btn} ${styles.btn}`}>Sign Up</button>
				</form>
			</div>
		);
	}
}

// Ensure prop types.
ConnectedSignUp.propTypes = {};

// SignUp is the react-redux connected sign up component.
const SignUp = connect(null, mapDispatchToProps)(ConnectedSignUp);

export default withRouter(SignUp);