# 無停止ロールアウトのデモ用アプリ

このコードは、ローカルのDocker-CEの開発環境では、docker-compose で起動できます。
また、開発したコンテナをDockerHubに登録して、Kubernetesへデプロイもできます。



# ローカルの開発環境での操作


## コードとコンテナのビルド、そして、システム起動

~~~
$ ls
README.md		docker			etc			note.txt
data			docker-compose.yml	k8s			selenium
$ docker-compose up -d
~~~


## 状態確認

~~~
$ docker-compose ps
         Name                       Command               State               Ports             
------------------------------------------------------------------------------------------------
aplrolloutdemo_app_1     docker-php-entrypoint php-fpm    Up      9000/tcp                      
aplrolloutdemo_redis_1   docker-entrypoint.sh redis ...   Up      0.0.0.0:6379->6379/tcp        
aplrolloutdemo_web_1     nginx -g daemon off;             Up      0.0.0.0:8090->80/tcp          
mysql                    docker-entrypoint.sh mysqld      Up      0.0.0.0:3306->3306/tcp        
phpmyadmin               /run.sh phpmyadmin               Up      0.0.0.0:8095->80/tcp, 9000/tcp
~~~


## 停止

~~~
$ docker-compose stop
Stopping aplrolloutdemo_web_1   ... done
Stopping aplrolloutdemo_app_1   ... done
Stopping phpmyadmin             ... done
Stopping mysql                  ... done
Stopping aplrolloutdemo_redis_1 ... done
~~~


## 再スタート

~~~
$ docker-compose start
Starting redis   ... done
Starting mysql   ... done
Starting myadmin ... done
Starting app     ... done
Starting web     ... done
~~~


## クリーンナップ

~~~
$ docker-compose down --rmi all
Stopping aplrolloutdemo_web_1   ... done
Stopping aplrolloutdemo_app_1   ... done
Stopping phpmyadmin             ... done
Stopping mysql                  ... done
Stopping aplrolloutdemo_redis_1 ... done
Removing aplrolloutdemo_web_1   ... done
Removing aplrolloutdemo_app_1   ... done
Removing phpmyadmin             ... done
Removing mysql                  ... done
Removing aplrolloutdemo_redis_1 ... done
Removing network aplrolloutdemo_default
Removing image redis:latest
Removing image mysql:5.7
Removing image phpmyadmin/phpmyadmin
Removing image aplrolloutdemo_app
Removing image aplrolloutdemo_web
~~~


# コンテナのビルドとDockerHubへの登録

k8s にデプロイするにあたり、ビルドするコンテナ

* PHP-FPM アプリケーション・コンテナ 1.0
* NGINX ウェブサーバー・コンテナ 1.0
* コンテンツの運搬用コンテナ 1.0,1.1


k8s 上で DockerHubからプルして、APIを使って利用するコンテナ

* redisコンテナ
* phpmyadminコンテナ


## ウェブサーバーのコンテナのビルド

~~~
$ docker build -t webserver:1.0 -f docker/Dockerfile.web .
~~~


## アプリサーバーのPHP-FPMコンテナのビルド

~~~
$ docker build -t apserver:1.0 -f docker/Dockerfile.app .
~~~

## データベースサーバーのコンテナのビルド

~~~
$ docker build -t dbserver:1.0 -f docker/Dockerfile.mysql .
~~~


## コンテンツ運搬用コンテナ

最初のコンテンツ バージョン 1.0 のコンテナを作成

~~~
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

$ git branch
  blue
* master

$ docker build -t contents:1.0 -f docker/Dockerfile.payload .
~~~

次に、ブランチを切り替えて、バージョン 1.1のコンテナを作成

~~~
$ git checkout blue
$ git branch
* blue
  master
~~~

~~~
$ docker build -t comtents:1.1 -f docker/Dockerfile.payload .
~~~


## コンテナイメージのリスト

~~~
imac:apl-rollout-demo maho$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
dbserver            1.0                 2707bd1b5e67        4 minutes ago       463MB
apserver            1.0                 0e3ee49fd74c        7 minutes ago       673MB
webserver           1.0                 8a93caaba198        10 minutes ago      109MB
contents            1.0                 43fbdaa030d6        About an hour ago   82.3MB
contents            1.1                 eb070c175994        About an hour ago   82.3MB
php                 7-fpm               e6970efc6d34        11 days ago         367MB
nginx               latest              ae513a47849c        2 weeks ago         109MB
ubuntu              latest              452a96d81c30        2 weeks ago         79.6MB
centos              6                   70b5d81549ec        5 weeks ago         195MB
busybox             latest              8ac48589692a        5 weeks ago         1.15MB
maho/node-red       1.0                 1568efbb7fa5        2 months ago        565MB
ubuntu              <none>              f975c5035748        2 months ago        112MB
mysql               5.7                 5d4d51c57ea8        2 months ago        374MB
~~~


## コンテナのタグ付け、DockerHubへのアップロード

~~~
docker login

docker tag apserver:1.0 maho/apserver:1.0
docker puth maho/apserver:1.0

docker tag webserver:1.0 maho/webserver:1.0
docker puth maho/webserver:1.0

docker tag dbserver:1.0 maho/dbserver:1.0
docker push maho/dbserver:1.0

docker tag contents:1.0 maho/contents:1.0
docker push maho/contents:1.0

docker tag contents:1.1 maho/contents:1.1
docker push maho/contents:1.1
~~~


~~~
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
dbserver            1.0                 2707bd1b5e67        About an hour ago   463MB
maho/dbserver       1.0                 2707bd1b5e67        About an hour ago   463MB
apserver            1.0                 0e3ee49fd74c        About an hour ago   673MB
maho/apserver       1.0                 0e3ee49fd74c        About an hour ago   673MB
webserver           1.0                 8a93caaba198        About an hour ago   109MB
maho/webserver      1.0                 8a93caaba198        About an hour ago   109MB
contents            1.0                 43fbdaa030d6        2 hours ago         82.3MB
maho/contents       1.0                 43fbdaa030d6        2 hours ago         82.3MB
contents            1.1                 eb070c175994        2 hours ago         82.3MB
maho/contents       1.1                 eb070c175994        2 hours ago         82.3MB
~~~


# Kubernetesへのデプロイ

~~~
$ cd k8s
$ kubectl apply -f 01-mysql-server.yaml
$ kubectl apply -f 02-redis-server.yaml
$ kubectl apply -f 03-web-app-green.yaml
$ kubectl apply -f 05-phpmyadmin.yaml
~~~


## ロールアウト

~~~
$ kubectl apply -f 04-web-app-blue.yaml
~~~


## ロールバック

~~~
$ kubectl rollout undo deployment ro-web-apserver
~~~
