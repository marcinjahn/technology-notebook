---
title: Scaling
description: ReplicaSet and Deployment objects in Kubernetes
lang: en-US
---

# Scaling

It's not very convenient to manage pods individually. We need ways to deploy
pods in multiple replicas, which is a base for high availability of the service.

::: tip Ownership
Pods managed by ReplicaSet/Deployment have a special "ownerReference" section in
their "metadata". A pod can have multiple owners.

Pods are auto-deleted when the owners are deleted.
:::

## ReplicaSet

ReplicaSet allows us to create a group of pod replicas, instead of just one pod.
The pods managed by the ReplicaSet are selected using an immutable label
selector (similarly to [Services](./services.md)). There is also a template,
which defines the pod(s) that will be created under ReplicaSet. Such a pod has
to conform to the *selector* specified by the ReplicaSet. If some pods matching
the selector already existed prior to the creation of the ReplicaSet, they're
counted as part of the ReplicaSet.

Pod names are generated based on the ReplicaSet's name, but it can be changed
with the `generateName` setting.

::: tip ReplicationController
In the past, ReplicationController was used instead of ReplicaSet. It behaved
the same as ReplicaSet does. It is now deprecated.
:::

### Updates

We're free to change `replicas` count and the number of pods will reflect the
setting.

If we modify the `template` of some existing ReplicaSet, the existing pods will
not be updated. Instead, just the pods created by ReplicaSet in the future will
have the new settings applied.

## Deployment

Creating a simple deployment: `kubectl create deployment kiada
--image=luksa/kiada:0.1`

Kubectl sends a POST request to `/deployments` of K8s API to create a
*Deployment* object. Kubernetes creates a *Pod* object based on Deployment. The
pod is assigned to a Worker Node. Kubelet on a worker node pulls the image and
runs the container.

### Scaling

`kubectl scale deployment kiada --replicas=3`

## Pods Deletion

When scaling down, K8s selects pods to delete based on some priorities:

- pods that are not started
- pods collocated on the same node with greater number of replicas
- pods that lived shorter
- pods with a greater number of restarts

We can also influence the priority by applying `pod-deletion-cost` annotation to
specific pods.

## Logs

There is no easy way to display logs from all the pods in a ReplicaSet/Deployment.
Instead, we have to use label selector:

```sh
k logs -l app=myapp --prefix --all-containers
```

- `--prefix` prefixes each log with the container that it came from
- `--all-containers` displays logs from all containers of the pods