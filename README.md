# k8s cluster on Vagrant virtual servers on MacOS or Windows10

*** WARNING ***

This repository is no longer maintenanced.
please move https://github.com/takara9/vagrant-kubernetes



# Prerequisite

This Vagrantfile is based on following platform.

* Vagrant v2.0.3
* Virtualbox v5.1.10
* MacOS 10.13.4 or Windows10
* RAM 8GB 


# Configure k8s cluseter on vagrant

~~~
$ git clone https://github.com/takara9/vagrant-k8s
$ cd vagrant-k8s
$ vagrant up
~~~


## Master node

the setup procedure of the master of Kubernetes after boot.
do login to node-1 that would be k8s master.

~~~
$ vagrant ssh node-1
~~~


Switch root user, and edit a configuration file for kubeadmin.

~~~
# sudo -s
# vi /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
~~~


Replace following line in 10-kubeadm.conf

~~~10-kubeadm.conf
Environment="KUBELET_DNS_ARGS=--cluster-dns=10.244.0.10 --cluster-domain=cluster.local --node-ip=172.16.20.11"
~~~

after save file edited, restart kubelet by following command.

~~~
# systemctl daemon-reload
# systemctl restart kubelet
~~~

Do initalaize master node by kubeadm init with following options.

~~~
# kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=172.16.20.11 --service-cidr=10.244.0.0/16
~~~

check output message of "kubeadm init", and should note thase text on the Memopad.

~~~
Your Kubernetes master has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of machines by running the following on each node
as root:

  kubeadm join 172.16.20.11:6443 --token tl1h2f.5juylkrnfi39nzs0 --discovery-token-ca-cert-hash sha256:9715403f839a6aae6bdd4da81da1444b934ef84a936378d756cb3f3df0c2828c
~~~

## setup the environment of kubectl at the master node

switch vagrant user, and do following procedure to make the enviroment for kubectl command.

~~~
$ mkdir -p $HOME/.kube
$ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
$ sudo chown $(id -u):$(id -g) $HOME/.kube/config
~~~

After that, check execution of kubectl command. STATUS would be NotReady that is a right.

~~~
vagrant@node-1:~$ kubectl get node
NAME      STATUS     ROLES     AGE       VERSION
node-1    NotReady   master    3m        v1.10.2
~~~

## setup the pod network

Download the YAML file for Flannel, and edit for vagrant environment.

~~~
$ curl -O https://raw.githubusercontent.com/coreos/flannel/v0.10.0/Documentation/kube-flannel.yml
~~~

add line "- --iface=enp0s8" after "- --kube-subnet-mgr"

~~~
image: quay.io/coreos/flannel:v0.10.0-amd64
command:
- /opt/bin/flanneld
args:
- --ip-masq
- --kube-subnet-mgr
- --iface=enp0s8
resources:
  requests:
    cpu: "100m"
    memory: "50Mi"
~~~

after editing, apply this configuration by kubectl command.

~~~
$ kubectl apply -f kube-flannel.yml
~~~

after that, STATUS of node-1 would change "Ready".

~~~
vagrant@node-1:~$ kubectl apply -f kube-flannel.yml
clusterrole.rbac.authorization.k8s.io "flannel" created
clusterrolebinding.rbac.authorization.k8s.io "flannel" created
serviceaccount "flannel" created
configmap "kube-flannel-cfg" created
daemonset.extensions "kube-flannel-ds" created
vagrant@node-1:~$ kubectl get node
NAME      STATUS     ROLES     AGE       VERSION
node-1    NotReady   master    6m        v1.10.2
vagrant@node-1:~$ kubectl get node
NAME      STATUS    ROLES     AGE       VERSION
node-1    Ready     master    7m        v1.10.2
~~~

the configuration of master node is over.


## Joining of a worker node

Login to node-2, and edit 10-kubeadm.conf as root user.

~~~
imac:vagrant-k8s maho$ vagrant ssh node-2
Welcome to Ubuntu 16.04.4 LTS (GNU/Linux 4.4.0-122-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  Get cloud support with Ubuntu Advantage Cloud Guest:
    http://www.ubuntu.com/business/services/cloud

2 packages can be updated.
0 updates are security updates.


vagrant@node-2:~$ sudo -s
root@node-2:~# vi /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
~~~

Replace following line in 10-kubeadm.conf

for node-2

~~~
Environment="KUBELET_DNS_ARGS=--cluster-dns=10.244.0.10 --cluster-domain=cluster.local --node-ip=172.16.20.12"
~~~

for node-3

~~~
Environment="KUBELET_DNS_ARGS=--cluster-dns=10.244.0.10 --cluster-domain=cluster.local --node-ip=172.16.20.13"
~~~

Restart kubelet daemon after editing.

~~~
# systemctl daemon-reload
# systemctl restart kubelet
~~~

Execute folloing command to join k8s cluster.

~~~
# kubeadm join 172.16.20.11:6443 --token aj37c0.jr90n3yhdtcz9gg0 --discovery-token-ca-cert-hash sha256:6990185a5a7c089a79b3069a7316c1bfb8563a6ad166d6f034851eb08f0fc8e1
~~~




# Labeling to worker node

~~~
vagrant@node-1:~$ kubectl get node
NAME      STATUS     ROLES     AGE       VERSION
node-1    Ready      master    14m       v1.10.2
node-2    Ready      <none>    3m        v1.10.2
node-3    NotReady   <none>    11s       v1.10.2

vagrant@node-1:~$ kubectl label node node-2 node-role.kubernetes.io/node=
node "node-2" labeled
vagrant@node-1:~$ kubectl label node node-3 node-role.kubernetes.io/node=
node "node-3" labeled

vagrant@node-1:~$ kubectl label nodes node-2 type=worker
node "node-2" labeled
vagrant@node-1:~$ kubectl label nodes node-3 type=worker
node "node-3" labeled

vagrant@node-1:~$ kubectl get node -L type
NAME      STATUS    ROLES     AGE       VERSION   TYPE
node-1    Ready     master    15m       v1.10.2
node-2    Ready     node      5m        v1.10.2   worker
node-3    Ready     node      1m        v1.10.2   worker
~~~

