import React from 'react';
import { connect } from 'react-redux';
import SongForm from './song-form';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state) => {
	return { songs: state.songs };
};

// ConnectedSongs is the songs component, which will be connected to the Redux
// store.
const ConnectedSongs = (props) => {
	return (
		<div>
			<SongForm />
			<p>This will be the list of songs, total count is {props.songs.length}</p>
		</div>
	);
};

// Songs is the react-redux connected songs component.
const Songs = connect(mapStateToProps)(ConnectedSongs);

export default Songs;