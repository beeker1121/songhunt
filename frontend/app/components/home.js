import React from 'react';

// App imports.
import Days from './days';
import styles from '../styles/home.css';

// Home is the application homepage.
const Home = () => {
	return (
		<div className={styles.home}>
			<Days />
		</div>
	);
};

export default Home;