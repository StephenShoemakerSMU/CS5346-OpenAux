#!/bin/bash

docker build . -t openauxfrontend 

docker tag openauxfrontend gcr.io/openaux/openauxfrontend 

docker push gcr.io/openaux/openauxfrontend 

gcloud run deploy openauxfrontend --allow-unauthenticated --image gcr.io/openaux/openauxfrontend --update-env-vars backend=backend=https://openauxexpress-aw26t3co7a-uc.a.run.app