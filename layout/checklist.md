☑ Implement embedded player
☑ Header for each day needs to show the date
☐ Text placeholder for days with no songs
☑ Song Form component
	☑ Handle error response from adding a song
☐ Finish 'show more link' in footer of Days component
	☐ Have API return null day next URL when at daysAgo limit, which should prevent show more link from rendering
☐ Version API (place all routes into v1)
☐ Sidebar
☐ Member system
	☐ Sign up page
	☐ Log in page
	☐ Profile page
		☐ Implements JWT check on updates, maybe with dash-only local API (separate from main API)?
	☐ JWT authentication
		☐ Implement user logged in state in React
		☐ Each member gets a single API key
			- API key cannot be deleted or changed (for now)
		☐ Send API key of member
☐ Commenting on songs
☐ Upvoting for songs
☐ Order songs by upvotes in <Day> component
☐ Check into exact JsonParse error from soundcloud node client when trying to add certain URLs
	- https://soundcloud.com/theknocks/house-party-oliver-disco-mixx