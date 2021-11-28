# Services

Pods are not accessible on the outside by default. Services enable a single
communication entry point to the pods. There'll be a single IP address
regardless of how many replicas are deployed.

Service's IP never changes, it's static, unlike the IPs of pods (pods die, and
new ones get created).

Creating a simple service: `kubectl expose deployment kiada --type=LoadBalancer
--port 8080`. It exposes all pods in the "kiada" deployment as a new service.
The pods will be accessible via a load balancer. Service name is inherited from
the deployment since we didn't specify any name.

## Load Balancer

Kuberneets allows to create a service of LoadBalancer type, but it does not
provide load balancing itself. It asks the cloud infrastucture to provide it.
The IP address of the load balancer becomes an External IP of the service.

![](https://i.imgur.com/ClDDOJ7.png)

Using Minikube or kind, the external IP will always be `<Pending>`, because load
balancing functionality does not exist. We can access the service via any worker
node IP with a port of the service:

![](https://i.imgur.com/TFPxmnh.png)

These node ports are what the load balancer would forward the traffic to if it
existed:

![](https://i.imgur.com/xp9CneN.png)

There are actually two load balancers:

- cloud-provider one that load balances traffic between nodes
- K8s one that load balances traffic between pods