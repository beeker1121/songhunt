import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import { addSongSuccess } from '../actions/songs';
import styles from '../styles/song_form.css';
import gStyles from '../styles/style.css';

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
	return {
		addSongSuccess: (song) => dispatch(addSongSuccess(song))
	};
};

// ConnectedSongForm is the song form component, which will be connected to the
// Redux store.
class ConnectedSongForm extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();

		// Create form state.
		this.state = {
			title: '',
			artist: '',
			genre: '',
			url: '',
			errors: {
				title: '',
				artist: '',
				genre: '',
				url: ''
			},
			isSending: false
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

		// If sending, return.
		if (this.state.isSending)
			return;

		// Reset errors and set isSending.
		this.setState({
			...this.state,
			errors: {
				title: '',
				artist: '',
				genre: '',
				url: ''
			},
			isSending: true
		});

		// Add the song.
		let song = { ...this.state };

		// Create separate variable outside of fetch scope
		// to store response.ok boolean, since we don't want
		// to get into Promise-land hell.
		let resOk;
		let resStatusCode;

		// Call the API.
		fetch('/api/songs', {
			method: 'POST',
			body: JSON.stringify(song),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.currentUser.token
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

				// Set isSending to false.
				newState.isSending = false;

				// If response is a 400 Bad Request.
				if (resStatusCode === 400) {
					// Loop through the errors and add to state.
					res.errors.forEach((err) => {
						newState.errors[err.param] = err.detail;
					});
				} else if (resStatusCode === 401) {
					// Redirect to log in page.
					this.props.history.push('/login');
					return;
				}

				this.setState(newState);
				return;
			}

			// Dispatch success action.
			this.props.addSongSuccess(res.data);

			// Reset state.
			this.setState({
				...this.state,
				title: '',
				artist: '',
				genre: '',
				url: '',
				isSending: false
			});
		}).catch((err) => {
			// There was a network or some other fetch error,
			// or, there was a res.json() parse error. Either
			// way, wrap it in the expected error response
			// format set to the url parameter.
			this.setState({
				...this.state,
				errors: {
					...this.state.errors,
					url: 'Internal server error'
				},
				isSending: false
			});
		});
	}

	render() {
		// Handle button style.
		let ButtonStyle;
		if (this.state.isSending)
			ButtonStyle = `${gStyles.sh_btn} ${styles.btn} ${gStyles.disabled}`;
		else
			ButtonStyle = `${gStyles.sh_btn} ${styles.btn}`;

		return (
			<div className={styles.song_form}>
				<form onSubmit={this.handleSubmit}>
					<div className={styles.top}>
						<div className={styles.top_left}>
							<label htmlFor="title">Title</label>
							<input type="text" id="title" name="title" className={gStyles.sh_input} value={this.state.title} onChange={this.handleChange} />
							{this.state.errors.title !== '' &&
								<span className={gStyles.param_error}>{this.state.errors.title}</span>
							}
						</div>
						<div className={styles.top_middle}>
							<label htmlFor="artist">Artist</label>
							<input type="text" id="artist" name="artist" className={gStyles.sh_input} value={this.state.artist} onChange={this.handleChange} />
							{this.state.errors.artist !== '' &&
								<span className={gStyles.param_error}>{this.state.errors.artist}</span>
							}
						</div>
						<div className={styles.top_right}>
							<label htmlFor="genre">Genre</label>
							<input type="text" id="genre" name="genre" className={gStyles.sh_input} value={this.state.genre} onChange={this.handleChange} />
							{this.state.errors.genre !== '' &&
								<span className={gStyles.param_error}>{this.state.errors.genre}</span>
							}
						</div>
					</div>

					<label htmlFor="url">URL</label>
					<input type="text" id="url" name="url" className={`${gStyles.sh_input} ${styles.url}`} value={this.state.url} onChange={this.handleChange} />
					{this.state.errors.url !== '' &&
						<span className={gStyles.param_error}>{this.state.errors.url}</span>
					}

					<button type="submit" className={ButtonStyle}>Add Song</button>
				</form>
			</div>
		);
	}
}

// Ensure prop types.
ConnectedSongForm.propTypes = {
	addSongSuccess: PropTypes.func.isRequired
};

// SongForm is the react-redux connected song form component.
const SongForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedSongForm);

export default withRouter(SongForm);