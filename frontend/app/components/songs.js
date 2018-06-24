import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SongForm from './song-form';
import { getSongs } from '../actions/songs';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state) => {
	return { songs: state.songs };
};

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {
		getSongs: (opts) => dispatch(getSongs(opts))
	};
};

// ConnectedSongs is the songs component, which will be connected to the Redux
// store.
class ConnectedSongs extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();
	}

	componentDidMount() {
		// Get the list of songs.
		this.props.getSongs();
	}

	render() {
		const List = this.props.songs.map((song) => {
			return (
				<div key={song.id}>
					Title: {song.title}<br />
					Artist: {song.artist}<br />
				</div>
			)
		});

		return (
			<div>
				<SongForm />
				<p>This will be the list of songs, total count is {this.props.songs.length}</p>
				{List}
			</div>
		);
	}
};

ConnectedSongs.propTypes = {
	songs: PropTypes.array.isRequired
};

// Songs is the react-redux connected songs component.
const Songs = connect(mapStateToProps, mapDispatchToProps)(ConnectedSongs);

export default Songs;