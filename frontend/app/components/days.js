import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import Day from './day';
import SongForm from './song-form';
import { getSongs } from '../actions/songs';
import styles from '../styles/days.css';

// mapStateToProps will map the Redux store state to our component properties.
// The Redux store state is passed as the first parameter, which we can then
// use to create our own object containing properties derived from the state.
const mapStateToProps = (state, ownProps) => {
	return {
		days: state.days,
		nextDayUrl: state.nextDayUrl
	};
};

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {
		getSongs: (nextDayUrl) => dispatch(getSongs(nextDayUrl))
	};
};

// ConnectedDays is the days component, which will be connected to the Redux
// store.
class ConnectedDays extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();

		// Set 'this' context for methods.
		this.getSongs = this.getSongs.bind(this);
	}

	componentDidMount() {
		// Get the list of songs for the first
		// day if we haven't already.
		if (this.props.days.allIds.length === 0)
			this.props.getSongs(this.props.nextDayUrl);
	}

	getSongs() {
		// Call parent getSongs method with the
		// nextDayUrl set.
		this.props.getSongs(this.props.nextDayUrl);
	}

	render() {
		// Loop through the days.
		const List = this.props.days.allIds.map((key) => {
			return (
				<Day id={key} key={key} />
			);
		});

		return (
			<div className={styles.days}>
				<SongForm />
				{List}

				<p onClick={this.getSongs}>'Show more' link  here</p>
			</div>
		);
	}
};

// Ensure prop types.
ConnectedDays.propTypes = {
	days: PropTypes.object.isRequired
};

// Days is the react-redux connected days component.
const Days = connect(mapStateToProps, mapDispatchToProps)(ConnectedDays);

export default Days;