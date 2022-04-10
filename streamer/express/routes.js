//const http = require('http'); TODO
const https = require('https');
const fs = require('fs');
const audio = require('./audio');

var playlist = [];
var nextID = 0;

module.exports = function routes(app, logger, dir) {

	// GET / - status check
	app.get('/', (req, res) => {
		logger.info(`GET request for / from address ${req.ip}`);
		res.status(200).send(JSON.stringify(audio.getCurrentTrack()));
	});

	//GET /playlist - return the list of tracks in the playlist
	app.get('/upcoming', (req, res) => {
		logger.info(`GET request for /upcoming from address ${req.ip}`);
		res.status(200).send(JSON.stringify(audio.getPlaylist()));
	});

	//POST /track - add a track to the playlist
	app.post('/track', (req, res) => {
		logger.info(`POST request for /track from address ${req.ip}`);

		//Return a 400 error if any required fields are missing
		if (!req.body.url || !req.body.filetype || !req.body.title) {
			logger.error(`POST request to /track from address ${req.ip} is missing required fields`);
			res.status(400).send("Missing required fields");
			return;
		}

		//Retrieve remote file
		https.get(req.body.url, res2 => {
			//If we get a 404/other error, return 400
			if (res2.statusCode != 200) {
				logger.error(`Request for '${req.body.url}' returned ${res2.statusCode}`);
				res.status(400).send("Error retrieving file");
				return;
			}

			//Create filestream and pipe download to file
			logger.info(`Saving file from "${req.body.url}" to ${dir}/${nextID}`);
			const file = fs.createWriteStream(`${dir}/${nextID}`);

			res2.pipe(file);

			//Once the file has finished downloading...
			file.on('finish', () => {
				file.close();
				logger.info(`File ${req.body.url} successfully downloaded`);
				
				audio.addToPlaylist(nextID, req.body.title, req.body.filetype);				

				nextID = nextID + 1;

				res.status(201).send()
			});

		}).on("error", err => {
			console.log(`Request for '${url}' threw ${err.code} error`);
			
		});
		
	});

};
