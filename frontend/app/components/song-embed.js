import React from 'react';

// App imports.
import styles from '../styles/song_embed.css';

// Embed is the song embed component.
class Embed extends React.Component {
	constructor() {
		super();
	}

	shouldComponentUpdate(nextProps, nextState) {
		// If both the embedHtml and embedHtmlError props are unchanged,
		// do not rerender. We could possibly just extend a React.PureComponent
		// instead, but this is more verbose.
		return (this.props.embedHtml != nextProps.embedHtml
			|| this.props.embedHtmlError != nextProps.embedHtmlError);
	}

	render() {
		if (this.props.embedHtmlError !== '')
			return (
				<div className={styles.embed}>{this.props.embedHtmlError}</div>
			);
		else
			return (
				<div className={styles.embed} dangerouslySetInnerHTML={{__html: this.props.embedHtml}} />
			);
	}
}

export default Embed;