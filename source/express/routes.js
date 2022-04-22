const fs = require('fs');
const audio = require('./audio');

module.exports = function routes(app, logger, dir) {

	// GET / - status check
	app.get('/', (req, res) => {
		logger.info(`GET request for / from address ${req.ip}`);
		res.status(200).send("pong");
	});

	//POST /track - add a track to the playlist
	app.post('/track', (req, res) => {
		logger.info(`POST request for /track from address ${req.ip}`);

		//Return a 400 error if any required fields are missing
		if (!req.body.url) {
			logger.error(`POST request to /track from address ${req.ip} is missing a URL`);
			res.status(400).send("Missing URL");
			return;
		}

		//Add the file to playlist
		audio.addToPlaylist(req.body.url);
		res.status(201).send();
	
	});

	app.all('*', (req, res) => {
		logger.error(`Invalid request for ${req.originalURL} from address ${req.ip}`);
		res.status(400).send("Invalid request");
	});

};
