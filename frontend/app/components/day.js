import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.

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
		const List = this.props.day.songs.map((songId) => {
			return (
				<div key={songId}>
					Should list song by ID: {songId}
				</div>
			);
		});

		return (
			<div>
				<p>This will be the list of songs, total count is {this.props.day.songs.length}</p>
				{List}
			</div>
		);
	}
};

ConnectedDay.propTypes = {
	day: PropTypes.object.isRequired
};

// Day is the react-redux connected day component.
const Day = connect(mapStateToProps, mapDispatchToProps)(ConnectedDay);

export default Day;