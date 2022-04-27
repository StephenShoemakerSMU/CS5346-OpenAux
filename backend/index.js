const {format} = require('util');
const express = require('express');
const Multer = require('multer');
const path = require('path')
const cors=require('cors');
const axios = require('axios')
// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Storage} = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();


const app = express();
app.use(cors({
  origin: ['http://localhost:3000', process.env.frontend]
}))

// This middleware is available in Express v4.16.0 onwards
app.use(express.json({limit: '50mb'}));

app.get("/", (req,res) => res.send("Open Aux Api!!!"))

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});




// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET||"openauxsongs");



// Process the file upload and upload to Google Cloud Storage.
app.post('/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  if(path.extname(req.file.originalname)!=".mp3"){
    res.status(400).send("Only MP3s accepted");
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );

    console.log(publicUrl)
    axios.post(`${process.env.liquidsoap}track`,
      {
      url:publicUrl
      }
    ).then(function (response) {
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
    res.status(200).send(publicUrl)
    
  });
  blobStream.end(req.file.buffer)
});

const PORT = parseInt(process.env.PORT) || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});