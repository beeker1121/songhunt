# Song Hunt

Song Hunt is a website for finding the best music daily, curated by the online community.

Check it out here: [http://songhunt.io/](http://songhunt.io/)

![Song Hunt Preview](https://raw.githubusercontent.com/beeker1121/songhunt/master/preview.gif)

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

The main application, which consists of the backend API and frontend application, is located in the `cmd/app` folder.

Download or clone this repository to your local machine or VM:

```sh
git clone https://github.com/beeker1121/songhunt.git
```

A MySQL database is required for this application to work.

The database schema has been exported to `cmd/app/database.sql`. This SQL file will create a new database called `songhunt`, but you can create it first then import into it:

```sh
mysql -u [your_user] -p songhunt < cmd/app/database.sql
```

Browse to the `cmd/app` directory and install the NPM packages:

```sh
npm install
```

This will install both development and production dependencies.

Next, set the required environment variables:

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

Run the `build:dev` NPM script:

```sh
npm run build:dev
```

These settings are used in the configuration files for both the backend and frontend applications.

Now we can start the application in development mode:

```sh
npm run start:dev
```

Browsing to your set host with the set port should show the homepage.

To start in production mode, simply run `build:prod` and `start:prod` NPM scripts instead of the `dev` versions:

```sh
npm run build:prod
npm run start:prod
```

## Technology

Below is the list of technology used for this project:

☐ Docker  
☑ Node.js  
☑ JavaScript (ES2015/ES6)  
☑ Express  
☑ React  
☑ React Router v4  
☑ Redux  
☑ Webpack  
☑ MySQL  
☑ JWT Authentication