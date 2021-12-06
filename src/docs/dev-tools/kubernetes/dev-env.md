# Dev Environment

- Minikube - a single VM with K8s components. It can also run directly on Linux
- kind - K8s in containers - each container is a single node. It uses CRI-O as
  the container runtime in each of the nodes.

Kind config for multiple nodes:

```yaml
# three node (two workers) cluster config
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
```

Starting : `kind create cluster --config kind-config.yml`

