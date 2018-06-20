import React from 'react';
import Songs from './songs';

// Home is the application homepage.
const Home = () => {
	return (
		<div>
			<h1>The home page</h1>
			<h3>Songs component:</h3>
			<Songs />
		</div>
	);
};

export default Home;