---
title: Configuration
description: Various ways to store configuration data in Kubernetes
lang: en-US
---

# Configuration

Applications in pods might be configured in a few ways.

## ConfigMaps

### Mounting as volumes

When mounting a ConfigMap/Secret as a volume, the files in the container are
actually symbolic links. Next to them is a directory with the actual files. This
was done so that when configMap changes, and Kubernetes updates the files, the
symbolic links will be switched to point to new files only after all of them get
updated properly. This solves a potential issue of container seeing only half of
the files being updated, which could lead to improper configuration of the app.

When using `subPath` while mounting configMap, the files do not get updated
together with configMap updates.

### Secrets

Secrets are very similar to configMaps. Some differences:

- Secrets are only distrubuted to the Nodes that run the Pods taht need the
  given Secret.
- Secrets in the Nodes are always only in memory, never written to the disk.

By default Secrets have `type` set to `Opaque`. There are various types of
secrets used by various K8s components. Examples of secret types:

- `kubernetes.io/basic-auth` - must container `username` and `password`
- `kubernetes.io/tls` - must contain `tls.crt` and `tls.key`

Secrets objects store secrets under the `data` key in base64 encoded format. In
order to crete a secret, you can either provide the base64-encoded values under
`data` or provide raw values under the `stringData` key. They will be
transformed to base64 and put under data by K8s. `stringData` is only writable,
not readable.

### Downward API

It allows to expose pod and container metadata (`metadata`, `spec` or `status`
fields and resource constraints, like CPU, RAM) via environment variables or
files (like ConfigMaps).

Supported metadata fields:

![](https://i.imgur.com/wBTt9eT.png)

Supported resource cnstraints injection:

![](https://i.imgur.com/2lMIWAD.png)

### Projected Volumes

When mounting Secrets, ConfigMaps, Downward API as volumes, they cannot be
mounted in the same directory (unless using `subPath`). Projected Volumes allow
to do that.