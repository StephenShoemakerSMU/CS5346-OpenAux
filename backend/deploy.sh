#!/bin/bash

docker build . -t openauxbackend 

docker tag openauxbackend gcr.io/openaux/openauxbackend

docker push gcr.io/openaux/openauxbackend

gcloud run deploy openauxbackend --allow-unauthenticated --image gcr.io/openaux/openauxbackend --update-env-vars frontend=https://openauxfrontend-aw26t3co7a-uc.a.run.app --update-env-vars liquidsoap=http://35.202.62.252/