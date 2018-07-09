# Song Hunt

Song Hunt is a website for finding the best music daily, curated by the online community.

## Project Details

- Member system
- Users must login to post and upvote songs
- Song plays in embedded streamer in drop down info for song, above comments
- Songs can be commented on
- Have users enter the URL, title, and artist of the song
- Only free streaming sites that require no login, such as SoundCloud and YouTube, are allowed
	- Check URL prefixes to enforce
- Have time cut off, so after 6 PM, any songs added start on the list for the next day
- Songs cannot be reposted for one year
- Login system via Facebook, SoundCloud, and Twitter (maybe Google?)

## Installation

The project in its current state is only ready for development, and the NPM scripts reflect this.

The main application, which consists of the backend API and frontend application, is located in the `cmd/app` folder.

A MySQL database is required for this application to work - an SQL import file will be provided in the future.

Download or clone this repository to your local machine or VM:

```sh
git clone https://github.com/beeker1121/songhunt.git
```

Browse to the `cmd/app` directory and install the NPM packages:

```sh
npm install
```

This will install both development and production dependencies.

Next, run the `build:dev` NPM script:

```sh
npm run build:dev
```

Set the required environment variables:

```sh
export DB_HOST="localhost"
export DB_USER="your_username"
export DB_PASS="your_password"
export SCHEME="http"
export HOST="yoursite.com"
export PORT=80
export JWT_SECRET="random_jwt_secret_string"
export SOUNDCLOUD_CLIENT_ID="your_soundcloud_client_id"
```

These settings are used in the configuration files for both the backend and frontend applications.

Now we can start the application in development mode:

```sh
npm run start:dev
```

Browsing to your set host with the set port should show the homepage.

## Technology

Below is the list of technology used for this project:

- Docker
- Node.js
- JavaScript (ES2015/ES6)
- Express
- React
- React Router v4
- Redux
- Webpack
- MySQL
- JWT Authentication