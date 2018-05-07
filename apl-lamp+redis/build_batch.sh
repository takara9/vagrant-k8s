#!/bin/bash

bx cr login
bx cr images

docker build . -f Dockerfile.web -t web:v2 \
&& docker tag web:v2 registry.ng.bluemix.net/takara/web:v2 \
&& docker push registry.ng.bluemix.net/takara/web:v2


docker build . -f Dockerfile.app -t app:v1 \
&& docker tag app:v1 registry.ng.bluemix.net/takara/app:v1 \
&& docker push registry.ng.bluemix.net/takara/app:v1

docker images
bx cr images
