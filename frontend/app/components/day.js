import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import Song from './song';

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
		// Loop through the songs.
		const List = this.props.day.songs.map((songId) => {
			return (
				<Song id={songId} key={songId} />
			);
		});

		return (
			<div>
				<span className="day-header">Day {this.props.id}</span>
				{List}
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