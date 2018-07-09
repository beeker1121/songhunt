import React from 'react';

// App imports.
import styles from '../styles/about.css';

// About is the application about page.
const About = () => {
	return (
		<div className={styles.about}>
			<h1>What is Song Hunt?</h1>

			<p>The goal of Song Hunt is simply to help everyone share and find good music, every day.</p>
			<p>Users will be able to post songs from SoundCloud (including your own productions), which will be listed with other songs posted that day.</p>
			<p>Everyone is then able to vote on which are the best for that day.</p>
			<p>As a song receives more upvotes, it will rank higher and become more visible.</p>
			<p>Want to hire me to build an application you have in mind? Need a good developer for your company?</p>
			<p>Contact me at <a href="http://beeker.io" target="_blank">http://beeker.io</a>.</p>
		</div>
	);
};

export default About;