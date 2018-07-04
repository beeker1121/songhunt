import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import { getSongEmbedHtmlSuccess } from '../actions/songs';
import styles from '../styles/song_detail.css';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state, ownProps) => {
	return { song: state.songs.byId[ownProps.id] };
};

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {
		getSongEmbedHtmlSuccess: (id, embedHtml) => dispatch(getSongEmbedHtmlSuccess(id, embedHtml))
	};
};

// ConnectedSongDetail is the song detail component, which will be connected to
// the Redux store.
class ConnectedSongDetail extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();

		this.state = {
			embedHtmlError: ''
		};

		// Set 'this' scope to this class for methods.
		this.getSongEmbedHtml = this.getSongEmbedHtml.bind(this);
	}

	componentDidMount() {
		// If we have not yet obtained the embed
		// HTML for this song.
		if (this.props.song.embedHtml === '')
			this.getSongEmbedHtml();
	}

	getSongEmbedHtml() {
		// Set the URL to call.
		let url = 'https://soundcloud.com/oembed?format=json&maxwidth=480&maxheight=140&url=' + this.props.song.url;

		// Create separate variable outside of fetch scope
		// to store response.ok boolean, since we don't want
		// to get into Promise-land hell.
		let resOk;

		// Call the API.
		fetch(url, {
			method: 'GET'
		}).then((res) => {
			// Store the ok boolean of the response.
			resOk = res.ok;

			// Parse response body as JSON.
			//
			// We use a promise here since the .json() method reads
			// in the response body in a returned Promise.
			return res.json();
		}).then((res) => {
			// Check if there was an HTTP code error
			// (res.ok checks if 200 <= res.statusCode <= 299).
			if (!resOk) {
				this.setState({
					embedHtmlError: 'Could not load embedded player for this song'
				});
				return;
			}

			// Dispatch success action.
			this.props.getSongEmbedHtmlSuccess(this.props.song.id, res.html);
		}).catch((err) => {
			this.setState({
				embedHtmlError: 'Could not load embedded player for this song'
			});
		});
	}

	render() {
		// Handle rendering the embedded player.
		let Embed;

		// If there was an error trying to get the embed HTML.
		if (this.state.embedHtmlError !== '')
			Embed = () => {
				return(
					<div className={styles.embed}>{this.state.embedHtmlError}</div>
				);
			};
		else
			Embed = () => {
				return(
					<div className={styles.embed} dangerouslySetInnerHTML={{__html: this.props.song.embedHtml}} />
				);
			};

		return (
			<div className={styles.detail}>
				<Embed />
			</div>
		);
	}
};

// Ensure prop types.
ConnectedSongDetail.propTypes = {
	song: PropTypes.object.isRequired,
	getSongEmbedHtmlSuccess: PropTypes.func.isRequired
};

// SongDetail is the react-redux connected song detail component.
const SongDetail = connect(mapStateToProps, mapDispatchToProps)(ConnectedSongDetail);

export default SongDetail;