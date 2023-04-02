---
title: Ingress
description: Ingress object in Kubernetes
lang: en-US
---

# Ingress

Ingresses add features on top of services. Some of the features:

- supporting L7 hosts
- matching paths
- TLS termination
- session affinity
- auth (e.g. OAuthProxy)
- CORS
- many other...

Ingress is a way for external users to access services within K8s. Ingress
consists of:

- *Ingress* object
- L7 load balancer (reverse proxy)
- Ingress Controller

Some ingress implementations require services to by of type *ClusterIp*. Some
others require *NodePort*.

Some ingress implementations use separate (external) IP addresses per ingress
object. Some others share the IP address for many ingress objects.

Most ingress implementations send requests to pods directly, skipping services
(for performance?).

:::tip[Nginx]
Some of the most popular implementations of ingress use nginx. There are two
implementations that use nginx: made by the K8s team, and another one made by
the nginx team.
:::

Most of the features of ingresses is configured via annotations. That's due to
variety of ingress implementations available on the market, each with different
unique capabilities. It would be difficult to standardize the set of features
that ingress should have, so the configuration exposed via Ingress object is
minimal. Additionally, some ingresses are configured via separate K8s objects.

## Default Backend

If no ingress rules match the request, normally a 404 is returned. We can specify
a defualt backend service where unmatched requests will be sent to.

## Multiple Ingress Controllers

We could have multiple ingress controllers installed on our cluster. In such a
case, the ingress objects need to specify which controller should be used.
Originally, it was done via the `kubernetes.io/ingress.class` annotation. Some
ingress implementations still use it. It's more recommended to rely on
`ingressClass`. Different ingress controllers provide different classes.
Installing a controller should automatically add a new `ingressClass` object to
the cluster. We can list available classes with `k get ingressclasses`.

We can specify which controller to use via `spec.ingressClassName` on the
ingress objects.

We are able to specify the default ingress class to be used by our ingress
objects by setting an appropriate annotation on the selected class.

:::tip[Custom ignress classes]
We can create our own ingress classes that could refer to any installed ingress
controllers. Some controllers allow specifying various parametes, and we could
use our custom classes to provide these parameters.

With that approach we could reuse the specified config with multiple ingress
objects by refering to our custom ingress class from them.
:::