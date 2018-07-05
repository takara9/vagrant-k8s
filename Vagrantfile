# -*- mode: ruby -*-
# # vi: set ft=ruby :
#

Vagrant.configure(2) do |config|
  (1..3).each do |i|
    config.vm.define "node-#{i}" do |s|
      s.vm.box = "ubuntu/xenial64"
      #s.vm.hostname = "node-#{i}"
      #s.vm.network :forwarded_port, host: 4040, guest: 4040
      #public_ip = "192.168.1.#{i+90}"
      #s.vm.network :public_network, ip: public_ip, bridge: "en0: Ethernet"
      #if i == 1 then
      #  s.vm.network :forwarded_port, host: 8001, guest: 8001
      #end

      private_ip = "172.16.20.#{i+10}"
      s.vm.network "private_network", ip: private_ip
      
      s.vm.provider "virtualbox" do |v|
        v.cpus = 1
        v.gui = false        
        if i == 1 then
          v.memory = 2048
          s.vm.hostname = "master"
        else
          v.memory = 1024
          #v.memory = 2048
          s.vm.hostname = "node-#{i-1}"
        end
      end

      s.vm.provision "shell", inline: <<-EOF
echo net.bridge.bridge-nf-call-iptables = 1 >> /etc/sysctl.conf
sysctl -p

#
apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common

#
# add repo Docker-CE
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

#
# add repo Kubernetes
cat <<EOF2 >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF2

#
# install Docker-CE
apt-get update
apt-get install -y docker-ce=$(apt-cache madison docker-ce | grep 17.03 | head -1 | awk '{print $3}')
usermod -aG docker vagrant

#
# install Kubernetes
#apt-get install -y kubelet=1.9.6-00 kubeadm=1.9.6-00 kubectl=1.9.6-00
apt-get install -y kubelet kubeadm kubectl

#
# install GlusterFs Client
export DEBIAN_FRONTEND=noninteractive
apt-get update && apt-get install -yq python-software-properties
add-apt-repository ppa:gluster/glusterfs-3.12
apt-get update && apt-get install -yq glusterfs-client

#
EOF
    end
  end

  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :box
  end

end


