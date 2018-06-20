import React from 'react';
import { Link } from 'react-router-dom';

// Header is the application header.
const Header = () => {
	return (
		<div>
			<h1>Header here</h1>
			<Link to='/about'>About</Link>
		</div>
	);
};

export default Header;