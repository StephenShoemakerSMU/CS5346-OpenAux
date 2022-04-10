const fs = require('fs');
const { exec } = require('child_process');

var playlist = [];
var dir;
var logger;
var current;

//Return the list of upcoming tracks
function getPlaylist () {
	return playlist; 
};

//Get the track currently being played
function getCurrentTrack () {
	return current;	
};

function initialize (l, d) {
	logger = l;
	dir = d;
};

//Add a track to the playlist
//TODO Hash the file for logging purposes
function addToPlaylist (id, title, filetype) {
	track = {
		id: id,
		title: title,
		timestamp: Date.now(),
		filetype: filetype
	};

	logger.info(`New ${filetype} track "${title}" added to playlist`);

	playlist.push(track);
};

//Play the track at "{dir}/${id}"
function playTrack (info, onFinish) {
	let cmd;

	if (info.filetype == "mp3") {
		cmd = `mpg123 -a hw:2,0,0 '${dir}/${info.id}'`;
	} else {
		throw `Filetype '${info.filetype}' not supported`;
	}

	exec(cmd, (err, stdout, stderr) => {
		if (err != null) throw `Error playing file ${dir}/${info.id}`;
		onFinish();
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

//Start playing through the playist
//WARNING: This will recurse forever!
function play () {

	if (playlist.length != 0) {
		//Play the next track in the list
		current = playlist.shift();
		playTrack(current, () => {deleteTrack(current); this.play();})
		logger.info(`Playing ${current.filetype} track "${current.title}"`);
	} else {
		//Wait, then try again
		if (current != null) logger.info("Playlist empty; waiting");
		current = null;
		setTimeout(() => {this.play();}, 500);
	};
};

module.exports = {
	getPlaylist: getPlaylist,
	getCurrentTrack: getCurrentTrack,
	initialize: initialize,
	addToPlaylist: addToPlaylist,
	play: play
};
