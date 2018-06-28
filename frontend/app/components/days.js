import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import Day from './day';
import SongForm from './song-form';
import { getSongs } from '../actions/songs';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state, ownProps) => {
	return { days: state.days };
};

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {
		getSongs: (daysAgo) => dispatch(getSongs(daysAgo))
	};
};

// ConnectedDays is the days component, which will be connected to the Redux
// store.
class ConnectedDays extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();
	}

	componentDidMount() {
		// Get the list of songs.
		this.props.getSongs(0);
	}

	render() {
		const List = Object.keys(this.props.days.byId).map((key) => {
			return (
				<Day id={key} key={key} />
			);
		});

		return (
			<div>
				<SongForm />
				<p>This will be the list of days, total count is {Object.keys(this.props.days.byId).length}</p>
				{List}

				<p>'Show more' link  here</p>
			</div>
		);
	}
};

ConnectedDays.propTypes = {
	days: PropTypes.object.isRequired
};

// Days is the react-redux connected days component.
const Days = connect(mapStateToProps, mapDispatchToProps)(ConnectedDays);

export default Days;