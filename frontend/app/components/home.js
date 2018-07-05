import React from 'react';

// App imports.
import Days from './days';
import Sidebar from './sidebar';
import styles from '../styles/home.css';

// Home is the application homepage.
const Home = () => {
	return (
		<div className={styles.home}>
			<Days />
			<Sidebar />
		</div>
	);
};

export default Home;