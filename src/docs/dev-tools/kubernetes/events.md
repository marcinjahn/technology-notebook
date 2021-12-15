---
title: Events
description: Event object in Kubernetes
lang: en-US
---

# Events

Controllers generate events as they work on bringing objects' state as
configured in the "Spec". Event types:

- Normal
- Warning - monitoring these can quickly inform us about issues

There is "Event" object type. Each of them is deleted 1 hour  after creation
(configurable) to save space in etcd.

![](https://i.imgur.com/Wytscp7.png)


`k describe <something>` automatically gets events attached to the object we're
looking at.

`k get ev --field-selector type=Warning` - displays only Warning events
