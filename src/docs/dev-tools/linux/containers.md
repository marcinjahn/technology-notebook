---
tags: linux, containers
---

# Containerization

## Sources

- "Kubernetes in Action (Second Edition)" book

## Namespaces

Containers rely on namespaces in Linux. There are 7 kinds of namespaces:

- mount
- process ID
- network
- IPC
- UNIX time-sharing system (UTS) - hostname, domain name
- users, groups

Each container is assigned with new namespaces of these types, creating an
illusion for the process that it runs on a separate machine.

Diferent processes may also share some namespace types, but not others:

![](https://i.imgur.com/ozbsNFE.png)


### Networking

Here's how network namespacing works. When a new container is started, it
receives a set of interfaces that are placed in new namespace:

![](https://i.imgur.com/emBNfbw.png)

## cgroups

Another feature of Linux kernel. It allows to limit system resources assigned to
a process (CPU time, CPU cores, RAM, disk, network bandwidth).

When we're setting restrictions for Docker continers (e.g. `--memeory="100m"`),
Docker really uses cgroups to limit the process.

## Capabilities

COntainers should not be able to invoke sys-calls that may break other
containers (like changing time, or loading kernel modules).

Docker has `--privileged` flag that gives special permissions to containers.
It's not ideal, because it gives ALL permissions.

Another option is to use Linux **capabilities**. There are many of them giivng
granular access to specific operations.

Another option is **seccomp** (Secure Computing Mode). A custom profile (JSON
file) can be applied to a containers listing sys-calls that it can make.

Further hardening may be achieved with AppArmor or SELinux (MAC).

## Standarization

Docker was the first container platform to make them popular. There's **CRI**
(Container Runtime Interface) that containers platform adhere to.