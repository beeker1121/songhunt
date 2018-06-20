import React from 'react';
import { connect } from 'react-redux';
import { addSong } from '../actions/index';

// mapDispatchToProps allows us to map the dispatch function of react-redux to
// our component. The dispatch function is passed as the first parameter, which
// we can then use to create our own object with functions using the required
// action.
const mapDispatchToProps = (dispatch) => {
	return {
		addSong: (song) => dispatch(addSong(song))
	};
};

// ConnectedSongForm is the song form component, which will be connected to the
// Redux store.
class ConnectedSongForm extends React.Component {
	constructor() {
		// Get access to 'this' as subclass.
		super();

		// Create form state.
		this.state = {
			title: ""
		};

		// Set 'this' scope to this class for methods.
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ title: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		// Add the song.
		const { title } = this.state;
		this.props.addSong({title: title});

		// Reset state.
		this.setState({title: ''});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="title">Title</label>
				<input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} />
				<button type="submit">Add Song</button>
			</form>
		);
	}
}

// SongForm is the react-redux connected song form component.
const SongForm = connect(null, mapDispatchToProps)(ConnectedSongForm);

export default SongForm;