import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import { upvoteSuccess, unvoteSuccess } from '../actions/songs';
import SongDetail from './song-detail';
import styles from '../styles/song.css';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state, ownProps) => {
	return {
		song: state.songs.byId[ownProps.id],
		currentUser: state.currentUser
	};
};

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {
		upvoteSuccess: (id) => dispatch(upvoteSuccess(id)),
		unvoteSuccess: (id) => dispatch(unvoteSuccess(id))
	};
};

// ConnectedSong is the song component, which will be connected to the Redux
// store.
class ConnectedSong extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();

		this.state = {
			showDetail: false
		};

		this.showHideDetail = this.showHideDetail.bind(this);
		this.toggleUpvote = this.toggleUpvote.bind(this);
		this.upvote = this.upvote.bind(this);
		this.unvote = this.unvote.bind(this);
	}

	showHideDetail() {
		let newState = {
			showDetail: !this.state.showDetail
		};

		this.setState(newState);
	}

	toggleUpvote(event) {
		event.preventDefault();
		event.stopPropagation();

		// Check if user is logged in.
		if (this.props.currentUser === null) {
			this.props.history.push('/login');
			return;
		}

		// Handle upvoting or unvoting based on current status.
		if (!this.props.currentUser.upvotes)
			return;
		else if (this.props.currentUser.upvotes[this.props.song.id])
			return this.unvote();
		else if (!this.props.currentUser.upvotes[this.props.song.id])
			return this.upvote();
	}

	upvote() {
		// Create separate variable outside of fetch scope
		// to store response.ok boolean, since we don't want
		// to get into Promise-land hell.
		let resOk;
		let resStatusCode;

		// Call the API.
		fetch('/api/songs/' + this.props.song.id.toString() + '/upvote', {
			method: 'POST',
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
				// Redirect to log in page.
				this.props.history.push('/login');
				return;
			}

			// Dispatch success action.
			this.props.upvoteSuccess(this.props.song.id);
		}).catch((err) => {
			// There was a network or some other fetch error,
			// or, there was a res.json() parse error. Either
			// way, wrap it in the expected error response
			// format set to the url parameter.
		});
	}

	unvote() {
		// Create separate variable outside of fetch scope
		// to store response.ok boolean, since we don't want
		// to get into Promise-land hell.
		let resOk;
		let resStatusCode;

		// Call the API.
		fetch('/api/songs/' + this.props.song.id.toString() + '/upvote', {
			method: 'DELETE',
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
				// Redirect to log in page.
				this.props.history.push('/login');
				return;
			}

			// Dispatch success action.
			this.props.unvoteSuccess(this.props.song.id);
		}).catch((err) => {
			// There was a network or some other fetch error,
			// or, there was a res.json() parse error. Either
			// way, wrap it in the expected error response
			// format set to the url parameter.
		});
	}

	render() {
		// Handle upvote arrow style, which is based
		// on if the user upvoted this song or not.
		let UpvoteArrowStyle;
		if (this.props.currentUser === null)
			UpvoteArrowStyle = `${styles.arrow}`;
		else if (!this.props.currentUser.upvotes)
			UpvoteArrowStyle = `${styles.arrow}`;
		else if (this.props.currentUser.upvotes[this.props.song.id])
			UpvoteArrowStyle = `${styles.arrow} ${styles.upvoted}`;
		else
			UpvoteArrowStyle = `${styles.arrow}`;

		return (
			<div className={styles.song}>
				<div className={styles.header} onClick={this.showHideDetail}>
					<div className={styles.thumbnail}>
						<img src={this.props.song.thumbnail_url} />
					</div>

					<div className={styles.info}>
						<span className={styles.title}>{this.props.song.title}</span>
						<span className={styles.artist}>{this.props.song.artist}</span>
					</div>

					<div className={styles.upvotes_container}>
						<div className={styles.upvotes} onClick={this.toggleUpvote}>
							<div className={UpvoteArrowStyle}></div>
							<span>{this.props.song.upvotes}</span>
						</div>
					</div>
				</div>
				{this.state.showDetail &&
				<SongDetail id={this.props.song.id} />
				}
			</div>
		);
	}
};

// Ensure prop types.
ConnectedSong.propTypes = {
	song: PropTypes.object.isRequired
};

// Song is the react-redux connected song component.
const Song = connect(mapStateToProps, mapDispatchToProps)(ConnectedSong);

export default withRouter(Song);