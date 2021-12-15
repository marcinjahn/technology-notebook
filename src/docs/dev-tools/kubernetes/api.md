---
title: Kubernetes API
description: Kubernetes JTTP API
lang: en-US
---


# Kubernetes API

The API exposes operations on the clusters via resources. Often a resource has
an associated object (e.g. `/apis/apps/v1/namespaces/ns/deployments/mydeploy` is
a resource that represents an object for `mydeploy` object). Some API resources
do not have objects associated with them (e.g.
`/apis/authorization.k8s.io/v1/subjectaccessreviews` checks for authorization of
user/service, there's no object associated). A single object may be represented
by two or more resources. Different versions of some endpoints exist, each can
return the same object with a bit different schema.

`k proxy` exposes the HTTP API locally at `127.0.0.1:8001`.

### Commands

- `k get <something> -o wide` - small table with more details 
- `k get <something> -o yaml` - YAML 
- `k describe <something>` - more readable than above, sometimes gives more
  information.
