---
title: Meaning and Purpose
description: Meaning and purpose of Kubernetes and high level view of it
lang: en-US
---

# Meaning and Purpose

Kubernetes is Greek for "**pilot/helmsman**" who steers the ship with the helm.
It's not a captain. Captain is responsible for the ship, while the Pilot steers
it. The pilot maintains the course of the ship, carries out the orders given by
the Captain, and reports back the ship's heading. Admin of the Kuberneets system
is the Captain.

Kubernetes provides an **abstraction layer** over the underlying hardware (to
both users and applications).

Kubernetes is **declarative**.

Kubernetes handles **daily management of apps**. If an app fails, K8s will
automatically restart it. If hardware node fails, K8s will move the apps to
different nodes.

Different cloud providers offer Kubernetes making it **a standard way of
deployment**.

Kubernetes is like **an operating system for a cluster**. Kubernetes provides
abstractions for:

- service discovery
- horizontal scaling
- load-balancing
- self-healing
- leader election

## High-level View

![Illustration from Kubernetes in Action](https://i.imgur.com/7kbbeWJ.png)

Everything in K8s is represented by an object.

### Sources

https://www.manning.com/books/kubernetes-in-action-second-edition
