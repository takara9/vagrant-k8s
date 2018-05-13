# web-nginx


~~~
bash-3.2$ ls
Dockerfile	README.md	html
~~~


~~~
bash-3.2$ docker build -t webserver:v1 .
Sending build context to Docker daemon  57.34kB
Step 1/2 : FROM nginx:latest
 ---> ae513a47849c
Step 2/2 : ADD ./html /usr/share/nginx/html
 ---> 871790acbc60
Successfully built 871790acbc60
Successfully tagged webserver:v1
~~~


~~~
bash-3.2$ docker images
REPOSITORY       TAG                 IMAGE ID            CREATED             SIZE
webserver        v1                  871790acbc60        35 seconds ago      109MB
~~~



~~~
bash-3.2$ docker login
...
Login Succeeded
~~~


~~~
bash-3.2$ docker tag webserver:v1 maho/webserver:v1
bash-3.2$ docker push maho/webserver:v1
The push refers to repository [docker.io/maho/webserver]
~~~




