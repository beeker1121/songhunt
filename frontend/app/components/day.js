import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import Song from './song';
import styles from '../styles/day.css';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state, ownProps) => {
	return { day: state.days.byId[ownProps.id] };
};

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {};
};

// ConnectedDay is the day component, which will be connected to the Redux
// store.
class ConnectedDay extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();
	}

	render() {
		// Handle the day header.
		let DayHeader;

		if (this.props.id === 0)
			DayHeader = () => {
				return (
					<span className={styles.header}>Today</span>
				);
			};
		else if (this.props.id === 1)
			DayHeader = () => {
				return (
					<span className={styles.header}>Yesterday</span>
				);
			};
		else
			DayHeader = () => {
				return (
					<span className={styles.header}>{this.props.id} Days Ago</span>
				);
			};

		// Loop through the songs.
		const List = this.props.day.songsOrderedByUpvotes.map((songId) => {
			return (
				<Song id={songId} key={songId} />
			);
		});

		// Create placeholder for no songs.
		const NoSongs = (() => {
			return (
				<span className={styles.no_songs}>No songs for today :( You should sign up and add one!</span>
			);
		})();

		return (
			<div>
				<DayHeader />
				{this.props.day.songs.length > 0 ? List : NoSongs}
			</div>
		);
	}
};

// Ensure prop types.
ConnectedDay.propTypes = {
	day: PropTypes.object.isRequired
};

// Day is the react-redux connected day component.
const Day = connect(mapStateToProps, mapDispatchToProps)(ConnectedDay);

export default Day;