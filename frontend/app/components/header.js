import React from 'react';
import { Link } from 'react-router-dom';

// App imports.
import styles from '../styles/header.css';

// Header is the application header.
const Header = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.logo}><a href="/">Song Hunt</a></div>

				<ul className={styles.nav}>
					<li><Link to='/about'>About</Link></li>
				</ul>
			</div>
		</div>
	);
};

export default Header;