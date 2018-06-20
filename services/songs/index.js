// Service defines the songs service.
class Service {
	constructor(db) {
		this.db = db || null;
	}

	// get handles getting songs.
	get(opts) {
		return this.db.songs.get(opts);
	}

	// create handles creating a new song.
	create(opts) {
		console.log("Gonna create from service");

		// Create the new song in the database.
		return new Promise((resolve, reject) => {
			this.db.songs.create(opts).then((song) => {
				console.log("Successfully saved the song");
				resolve(song);
			}).catch((err) => {
				reject(err);
			})
		})
	}
}

module.exports = Service;