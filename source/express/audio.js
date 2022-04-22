const fs = require('fs');
const { exec } = require('child_process');
const net = require("net");

var playlist = [];
var dir;
var logger;
var current;

function writeLiquidsoapCommand (cmd, fun) {

	let socket = net.connect(4000, "localhost");

	socket.on('connect', () => {
		console.log("Successfully connected to liquidsoap socket.");
		return socket.write(`${cmd}\n`, res => {
			fun(res);
			socket.write("quit\n");		
		});

	});

	socket.on("end", () => {
		console.log("Connection closed.");
	});

}

function initialize (l, d) {
	logger = l;
	dir = d;
};

//Add a track to the playlist
//TODO Hash the file for logging purposes
function addToPlaylist (url) {	
	writeLiquidsoapCommand(`request.queue_0.push ${url}`, res => {
		logger.info(`Added track to queue from '${url}'`);
	});
};

//Delete the given track from the file system
function deleteTrack(info) {
	let cmd = `rm ${dir}/${info.id}`;

	logger.info(`Deleting track "${info.title}" (${dir}/${info.id})`);

	exec(cmd, (err, stdout, stderr) => {
		if (err != null) logger.error(`Error deleting file ${dir}/${info.id}`);
	});
}


module.exports = {
	initialize: initialize,
	addToPlaylist: addToPlaylist
};
