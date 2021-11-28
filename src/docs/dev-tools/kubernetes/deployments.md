# Deployments

Creating a simple deployment: `kubectl create deployment kiada
--image=luksa/kiada:0.1`

Kubectl sends a POST request to `/deployments` of K8s API to create a
*Deployment* object. Kubernetes creates a *Pod* object based on Deployment. The
pod is assigned to a worked node. Kubelet on a worker node pulls the image and
runs the container.

## Scaling

`kubectl scale deployment kiada --replicas=3`
