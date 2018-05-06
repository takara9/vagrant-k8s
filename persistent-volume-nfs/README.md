

# Prerequisite

A node needs to install the nfs client package, because of Docker container depends on Linux kernel of host server.

~~~
# apt-get install nfs-common
~~~


# Start Virutal Server

~~~
$ cd vagrant
$ vagrant up
~~~


# Setup

~~~
vagrant@node-1:/vagrant/persistent-volume-nfs$ kubectl delete -f pvc-nfs.yaml
persistentvolumeclaim "nfs-1" deleted
vagrant@node-1:/vagrant/persistent-volume-nfs$ kubectl delete -f pv-nfs.yaml
persistentvolume "nfs-1" deleted
vagrant@node-1:/vagrant/persistent-volume-nfs$ kubectl apply -f pv-nfs.yaml
persistentvolume "nfs-1" created
vagrant@node-1:/vagrant/persistent-volume-nfs$ kubectl apply -f pvc-nfs.yaml
persistentvolumeclaim "nfs-1" created
vagrant@node-1:/vagrant/persistent-volume-nfs$ kubectl apply -f nginx-nfs-client.yaml
deployment.extensions "nginx-nfs" created
service "nginx-nfs" created
~~~


# Wait to start the Web Server

~~~
vagrant@node-1:/vagrant/persistent-volume-nfs$ kubectl get po
NAME                         READY     STATUS              RESTARTS   AGE
debug-shell                  1/1       Running             0          14m
nginx-6f596bfb6d-dc5l6       1/1       Running             0          11h
nginx-nfs-7df6b7f4bc-k2j5q   0/1       ContainerCreating   0          12s
nginx-nfs-7df6b7f4bc-kvc5b   0/1       ContainerCreating   0          12s

vagrant@node-1:/vagrant/persistent-volume-nfs$ kubectl get po
NAME                         READY     STATUS    RESTARTS   AGE
debug-shell                  1/1       Running   0          14m
nginx-6f596bfb6d-dc5l6       1/1       Running   0          11h
nginx-nfs-7df6b7f4bc-k2j5q   1/1       Running   0          31s
nginx-nfs-7df6b7f4bc-kvc5b   1/1       Running   0          31s
vagrant@node-1:/vagrant/persistent-volume-nfs$ kubectl get svc

NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.244.0.1       <none>        443/TCP        12h
nginx-nfs    NodePort    10.244.203.176   <none>        80:32080/TCP   36s
~~~


# Access test

~~~
vagrant@node-1:/vagrant/persistent-volume-nfs$ curl http://192.168.1.91:32080/
Hello from NFS Server
vagrant@node-1:/vagrant/persistent-volume-nfs$ curl http://192.168.1.92:32080/
Hello from NFS Server
vagrant@node-1:/vagrant/persistent-volume-nfs$ curl http://192.168.1.93:32080/
Hello from NFS Server
vagrant@node-1:/vagrant/persistent-volume-nfs$ curl http://localhost:32080/
Hello from NFS Server
~~~


