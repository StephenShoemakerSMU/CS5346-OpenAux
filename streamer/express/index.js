//require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const routes = require('./routes');
const audio = require('./audio');

// set up some configs for express.
const config = {
  name: 'openaux-streamer',
  port: 3000,
  host: '0.0.0.0',
}; 

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

//Other static variables
const dir = "/var/cache/streamer" //Working directory

app.use(bodyParser.json());
app.use(cors({ 
  origin: '*'
}));

//CORS lite Setup
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//playlist setup
audio.initialize(logger, dir);
audio.play();

//include routes
routes(app, logger, dir);

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
