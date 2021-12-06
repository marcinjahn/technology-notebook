# Services

Pods can communicate with each other using private IP address space. They can be
on different nodes, but K8s handles appropriate routing. For a pod, all other
pods are on the same LAN.

![](assets/pods-network-flat.png)

Problems:

- Pods are ephemeral and their IP might suddenly change.
- Pods are not accessible on the outside by default.

Services enable a single communication entry point to the pods. There'll be a
single IP address regardless of how many replicas are deployed.

Service's IP never changes, it's static, unlike the IPs of pods (pods die, and
new ones get created).

::: tip
Services make the pods accessible at one static entry point (IP), no matter how
many replicas there are.

![](assets/k8s-service.png)
:::

Services operate at the Layer 4 of the [OSI model](/networking/osi-model.md).
They do not understand URLs, cookies (e.g. cookie-based affinity is not
supported, only IP-based is supported), etc.

Creating a simple service: `kubectl expose deployment kiada --type=LoadBalancer
--port 8080`. It exposes all pods in the "kiada" deployment as a new service.
The pods will be accessible via a load balancer. Service name is inherited from
the deployment since we didn't specify any name.

## DNS

K8s runs pods with DNS servers (and a service to expose them as ClusterIP!),
which all pods are configured to use. Thanks to them, service's IP is resolvable
by service's name. If a service resides in a different namespace than the client
pod, the namespace must be appended to the URL. Examples:

- `http://quiz` - when the `quiz` service is in the same ns
- `http://quiz.kiada` - when the `quiz` service is in another namespace (called
  `kiada`)

::: tip Other URLs
Services are resolvable with:

- `<service-name>` - same NS
- `<service-name><service-ns>` - different NS
-  `<service-name>.<service-namespace>.svc`
-  `<service-name>.<service-namespace>.svc.cluster.local` - the `cluster.local`
   suffix might be changed at the cluster level.
:::

The IP addresses of services in a namespace are also available as envs in all
pods (the pod needs to be started after the service is created!). It's better to
rely on DNS though. These envs may be disabled with `enableServiceLinks` on a
pod.

## Binding services to pods

Services use **label selectors** to find pods that belong to a Service.

![](assets/service-binding-to-pods.png)

## Services types

K8s supports the following Service types:

- **ClusterIP** - only within the cluster (it's the **default**). It acts as a load
  balancer when multiple pods are behind it.
- **NodePort**
- **LoadBalancer**
- **ExternalName**

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

## Tips

- Services cannot be pinged