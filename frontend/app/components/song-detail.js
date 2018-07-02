import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import { getSongEmbedHtml } from '../actions/songs';
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
		getSongEmbedHtml: (id, songUrl) => dispatch(getSongEmbedHtml(id, songUrl))
	};
};

// ConnectedSongDetail is the song detail component, which will be connected to
// the Redux store.
class ConnectedSongDetail extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();
	}

	componentDidMount() {
		// If we have not yet obtained the embed
		// HTML for this song.
		if (this.props.song.embedHtml === '' &&
			this.props.song.embedHtmlError === '')
			this.props.getSongEmbedHtml(
				this.props.song.id,
				this.props.song.url
			);
	}

	render() {
		// Handle rendering the embedded player.
		let Embed;

		// If there was an error trying to get the embed HTML.
		if (this.props.song.embedHtmlError !== '')
			Embed = () => {
				return(
					<div className={styles.embed}>{this.props.song.embedHtmlError}</div>
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
	song: PropTypes.object.isRequired
};

// SongDetail is the react-redux connected song detail component.
const SongDetail = connect(mapStateToProps, mapDispatchToProps)(ConnectedSongDetail);

export default SongDetail;