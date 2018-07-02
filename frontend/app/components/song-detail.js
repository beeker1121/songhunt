import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
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
	return {};
};

// ConnectedSongDetail is the song detail component, which will be connected to
// the Redux store.
class ConnectedSongDetail extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();
	}

	render() {
		return (
			<div className={styles.detail}>
				This is the detail section
				<p>Title: {this.props.song.title}</p>
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