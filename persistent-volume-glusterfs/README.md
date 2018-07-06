# GlusterFS Server and Heketi Server on Vagrant

Kubernetes - Heketi - GlusterFS テスト用 Vagrantfile


## GlusterFS と Heketi サーバーの開始

次の方法で、３つのGlusterFSサーバー と一つのHeketiサーバーが起動します。

```console
$ vagrant up
```

起動が完了したら、次のコマンドで稼働を確認します。

```console
$ curl http://172.20.1.10:8080/hello;echo
HelloWorld from GlusterFS Application
```



もう一つウィンドを開いて、クライアントでセットアップします。

```console
$ vagrant ssh heketi
$ export HEKETI_CLI_SERVER=http://localhost:8080
$ cd heketi
$ ./heketi-cli cluster create mycluster
Cluster id: d2d59b4d954d2b93ea9066ee55ee1daf
```

クラスタへのノードの追加します。 前のステップで得たCluster id を -cluster=にセットします。 それからノードのIPアドレスは、テスト環境に合わせて、Vagrantfileを変更してください。
```console
$ ./heketi-cli node add -cluster=d2d59b4d954d2b93ea9066ee55ee1daf -zone=1 -management-host-name=172.20.1.11 -storage-host-name=172.20.1.11

$ ./heketi-cli node add -cluster=d2d59b4d954d2b93ea9066ee55ee1daf -zone=1 -management-host-name=172.20.1.12 -storage-host-name=172.20.1.12

$ ./heketi-cli node add -cluster=d2d59b4d954d2b93ea9066ee55ee1daf -zone=1 -management-host-name=172.20.1.13 -storage-host-name=172.20.1.13

```

クラスタのメンバーのリスト

```console
$  ./heketi-cli cluster list
Clusters:
d2d59b4d954d2b93ea9066ee55ee1daf

$ ./heketi-cli cluster info d2d59b4d954d2b93ea9066ee55ee1daf
Cluster id: d2d59b4d954d2b93ea9066ee55ee1daf
Nodes:
3caac7d86adf372f2a726acf59ca19da
6e9c68c3c40f8e7b650fff7a7a18499e
e15a6b9d0727a64f103d9aa759c3b827
Volumes:
```

デバイスの作成では、--node=の値は、前ステップのNodes:の表示をコピペして利用します。

```console
$ ./heketi-cli device add --name=/dev/sdc --node=3caac7d86adf372f2a726acf59ca19da
Device added successfully

$ ./heketi-cli device add --name=/dev/sdc --node=6e9c68c3c40f8e7b650fff7a7a18499e
Device added successfully

$ ./heketi-cli device add --name=/dev/sdc --node=e15a6b9d0727a64f103d9aa759c3b827
```

セットアップは以上で、ボリュームはkubernetes側から作成になります。


heketi側で実施してテストするには、以下の様にします。

```console
$ ./heketi-cli volume create --size=12 --replica=3
```


## クリーンナップ

全て削除するときは、次のコマンドを実行

```console
$ vagrant destroy -f
```
