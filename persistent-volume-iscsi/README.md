

# Start iSCSI server

~~~
imac:vagrant maho$ vagrant status
Current machine states:

target                    not created (virtualbox)
initiator                 not created (virtualbox)
~~~

~~~
imac:vagrant maho$ vagrant up
...

imac:vagrant maho$ vagrant status
Current machine states:

target                    running (virtualbox)
initiator                 running (virtualbox)
~~~


# Deply MySQL Pod

~~~
vagrant@node-1:/vagrant/persistent-volume-iscsi$ kubectl apply -f chap-secret.yaml
secret "chap-secret" created

vagrant@node-1:/vagrant/persistent-volume-iscsi$ kubectl apply -f mysql-deploy-iscsi.yaml
deployment.extensions "mysql-server" created

vagrant@node-1:/vagrant/persistent-volume-iscsi$ kubectl apply -f mysql-service.yaml
service "mysql" created
~~~

# TEST

~~~
imac:vagrant maho$ mysql -u root -proot -h 192.168.1.91 -P 32306
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.22 MySQL Community Server (GPL)

Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| test               |
+--------------------+
5 rows in set (0.00 sec)
~~~

