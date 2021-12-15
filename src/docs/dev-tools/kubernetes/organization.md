---
title: Organizing Objects
description: Ways to add some meta data to objects in Kubernetes
lang: en-US
---

# Organizing Objects

K8s has `Namespaces` and `Labels` for organizing objects.

## Namespaces

![](https://i.imgur.com/fwwV6OV.png)

Different teams can deploy their objects in separate namespaces. Each team gets
access to one or more namespaces. Objects in different namespaces can use the
sama names.

Not all object types are namespaced. E.g, Nodes, PersistentVolumes,
StorageClasses, Namespaces are not namespaced. They are cluster-scoped.

![](https://i.imgur.com/A7IYoPG.png)

Deleting a namespace automatically deletes all objects in it.

### Default Namespaces

Each K8s cluster contains a few predefined namespaces. Those prefixed with
`kube-` are K8s system namespaces.

### Isolation

Other than allowing names of objects to be the same in different namespaces,
there is no isolation:

- pods from different namespaces can run on the same node
- by default there is no network isolation - a pod from one ns can talk to pods
  from another ns. Isolation can be configured using a `NetworkPolicy` object.

Namespaces should not be used to separate production workloads from development
environments. It's better to use separate clusters.

## Labels

Labels are key-value pairs that can be added to any object to decorate it with
some meta data. Labels are placed in `metadata.labels` section of YAML.

K8s uses labels on its own. For example Node objects have `kubernetes/io.arch`
labels idicating CPU architecture of a node. K8s does not usually add labels to
objects that users create.

Labels have various limitations in length, and accepted characters of keys and
values.

### Querying

Objects can be queried by the values of their labels. Operators:

- =
- !=
- in
- notin

Kubectl examples: 

- `k get pods -l app=webapp`
- `k get pods -l app=webapp,rel=canary`
- `k get pods -l 'app in (quiz, quote)'`
- `k delete pod -l rel=canary`

### Selectors

Some objects accept label selections. For example in the YAML of a pod, under
`spec.nodeSelector` we can specify labels and their values that we required on a
node for the pod to run on it. It supports only the `=` operator. Other objects
do support other operators.

Similarly, a PersistentVolumeClaim may define required labels of the
PersistentVolume that it will attach to. The YAML path is
`spec.selector.matchLabels`.

#### Field Selectors

Similarly there are also **field selectors**. They can be used with kubectl (or
K8s API) to filter objects based on some object properties. Not all properties
are supported with selectors. For example:

`k get pods --field-selector spec.nodeName=kind-worker-2` `kubectl get po
--field-selector status.phase!=Running --all-namespaces`

## Annotations

They are similar to labels. They have less limitations regarding length and
content (e.g. annotation can have 256KB and it can contain any character). They
can't be used to filter objects. They are placed in `metadata.annotations`.

Various controllers add annotations to objects if the information can't be
stored in other fields. 

Sometimes, before changing structure of objects, annotations are used as a
testing ground for K8s. After some time, annotation gets deprecated, and a new
field is introduced in an object. After another few releases annotation support
is removed entirely.

Annotations are a good place to store various information about the object:
description, author, git hash, build timestamp, etc. For example, Azure pipeline
adds various information to the annotations of the objects it deploys.