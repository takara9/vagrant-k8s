FROM nginx:latest
RUN apt-get update \
    && apt-get install -y vim curl git stress

CMD /usr/bin/stress --cpu 1 --vm-bytes 256M

WORKDIR /tmp
