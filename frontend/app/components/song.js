import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import styles from '../styles/song.css';

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

// ConnectedSong is the song component, which will be connected to the Redux
// store.
class ConnectedSong extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();
	}

	render() {
		return (
			<div className={styles.song}>
				<div className={styles.header}>
					<div className={styles.thumbnail}>
						<img src={this.props.song.thumbnail_url} />
					</div>

					<div className={styles.info}>
						<span className={styles.title}>{this.props.song.title}</span>
						<span className={styles.artist}>{this.props.song.artist}</span>
					</div>
				</div>
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

export default Song;