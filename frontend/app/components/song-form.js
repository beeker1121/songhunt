import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports.
import { addSong } from '../actions/songs';
import styles from '../styles/song_form.css';
import gStyles from '../styles/style.css';

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
			title: '',
			artist: '',
			url: ''
		};

		// Set 'this' scope to this class for methods.
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		switch (event.target.id) {
			case 'title':
				this.setState({ title: event.target.value});
				break;
			case 'artist':
				this.setState({ artist: event.target.value});
				break;
			case 'url':
				this.setState({ url: event.target.value});
				break;
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		// Add the song.
		const song = this.state;
		this.props.addSong(song);

		// Reset state.
		this.setState({
			title: '',
			artist: '',
			url: ''
		});
	}

	render() {
		return (
			<div className={styles.song_form}>
				<h3>Post a song</h3>

				<form onSubmit={this.handleSubmit}>
					<div className={styles.top}>
						<div className={styles.top_left}>
							<label htmlFor="title">Title</label>
							<input type="text" id="title" name="title" className={gStyles.sh_input} value={this.state.title} onChange={this.handleChange} />
						</div>
						<div className={styles.top_right}>
							<label htmlFor="artist">Artist</label>
							<input type="text" id="artist" name="artist" className={gStyles.sh_input} value={this.state.artist} onChange={this.handleChange} />
						</div>
					</div>

					<label htmlFor="url">URL</label>
					<input type="text" id="url" name="url" className={`${gStyles.sh_input} ${styles.url}`} value={this.state.url} onChange={this.handleChange} />

					<button type="submit" className={`${gStyles.sh_btn} ${styles.btn}`}>Add Song</button>
				</form>
			</div>
		);
	}
}

// Ensure prop types.
ConnectedSongForm.propTypes = {
	addSong: PropTypes.func.isRequired
};

// SongForm is the react-redux connected song form component.
const SongForm = connect(null, mapDispatchToProps)(ConnectedSongForm);

export default SongForm;