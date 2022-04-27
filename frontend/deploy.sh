#!/bin/bash

docker build . -t openauxfrontend 

docker tag openauxfrontend gcr.io/openaux/openauxfrontend 

docker push gcr.io/openaux/openauxfrontend 

gcloud run deploy openauxfrontend --allow-unauthenticated --image gcr.io/openaux/openauxfrontend --update-env-vars REACT_APP_BACKEND=https://openauxbackend-aw26t3co7a-uc.a.run.app/,REACT_APP_ICECAST=http://35.202.177.233/stream.ogg