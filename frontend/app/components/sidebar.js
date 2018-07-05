import React from 'react';

// App imports.
import styles from '../styles/sidebar.css';

// Sidebar defines the sidebar component.
const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<h3>Like New Music?</h3>

			<p>Song Hunt is a place to find and list the best music, voted on by you.</p>
			<p>New songs are posted and voted on daily by our members, with the best tracks rising to the top of the list.</p>
			<p>Join today and start finding and sharing your favorite music.</p>
		</div>
	);
};

export default Sidebar;