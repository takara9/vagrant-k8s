# web-nginx


~~~
$ ls
Dockerfile	README.md	html
~~~


~~~
$ docker build -t webserver:v1 .
Sending build context to Docker daemon  57.34kB
Step 1/2 : FROM nginx:latest
 ---> ae513a47849c
Step 2/2 : ADD ./html /usr/share/nginx/html
 ---> 871790acbc60
Successfully built 871790acbc60
Successfully tagged webserver:v1
~~~

ビルドされたイメージ


~~~
$ docker images
REPOSITORY       TAG                 IMAGE ID            CREATED             SIZE
webserver        v1                  871790acbc60        35 seconds ago      109MB
~~~


イメージをコンテナとして実行（バックグランド）

~~~
$ docker run -d -p 8080:80 --name web webserver:v1
~~~


イメージをフォアフランドで実行

~~~
$ docker run -t -p 8080:80 --name web webserver:v1
172.17.0.1 - - [13/May/2018:11:24:32 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0" "-"
172.17.0.1 - - [13/May/2018:11:24:32 +0000] "GET /images/NGINX_logo_rgb-01.png HTTP/1.1" 304 0 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0" "-"
172.17.0.1 - - [13/May/2018:11:24:32 +0000] "GET /images/docker-logo.png HTTP/1.1" 304 0 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0" "-"
172.17.0.1 - - [13/May/2018:11:24:32 +0000] "GET /images/kubernetes-logo.png HTTP/1.1" 304 0 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0" "-"
~~~


コンテナの実行状態確認

~~~
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                  NAMES
9baa1a05bd40        webserver:v1        "nginx -g 'daemon of…"   About a minute ago   Up About a minute   0.0.0.0:8080->80/tcp   web
~~~


バックグランドで実行中のコンテナへログイン

~~~
$ docker exec -it web bash
~~~



コンテナの停止と削除

~~~
$ docker kill web
web
$ docker rm web
web
~~~






~~~
$ docker login
...
Login Succeeded
~~~


~~~
$ docker tag webserver:v1 maho/webserver:v1
$ docker push maho/webserver:v1
The push refers to repository [docker.io/maho/webserver]
~~~




