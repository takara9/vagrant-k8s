#!/bin/bash

bx cr login
bx cr images

IMAGE1=node_app:v1
docker build . -f Dockerfile.nodejs -t ${IMAGE1} \
&& docker tag ${IMAGE1} registry.ng.bluemix.net/takara/${IMAGE1} \
&& docker push registry.ng.bluemix.net/takara/${IMAGE1}

IMAGE1=proxy_cache:v1
docker build . -f Dockerfile.nginx -t ${IMAGE1} \
&& docker tag ${IMAGE1} registry.ng.bluemix.net/takara/${IMAGE1} \
&& docker push registry.ng.bluemix.net/takara/${IMAGE1}


docker images
bx cr images
