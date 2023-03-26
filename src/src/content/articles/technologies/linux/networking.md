---
title: Networking
description: Information about networking in Linux
tags: ["linux", "networking", "firewall"]
lang: en-US
---

# {{ $frontmatter.title }}

## Toolset

There two most commonly used tools for the configuration of networks on Linux:

- old toolset (e.g., `ifconfig`)
- new toolset (e.g., `ip`)

The old toolset may be installed with the `net-tools` package. The new tools are
available in the `iproute2` package.

Basic commands:

- `ip a` - shows interfaces
- `ip r` - shows routes
- `nmcli` - Network Manager CLI, can be used to modify interfaces (e.g., to set
  static IP address)
- `sudo ip link set ens33 [up/down]` - enabling/disabling an interface
- `netstat -tuan` - shows open ports on the host (TCP/UDP)
- `nmap` - port scanner

## Firewall

There are a bunch of tools that allow us to manage firewall:

- `iptables` - deprecated, but the syntax is still in use via nftables
  compatibility layer.
- `nftables` - a replacement for iptables, it also has iptables-compatible CLI.
  The new CLI is invoked with `nft`.
- `ufw` - shipped with Ubuntu-based distros
- `firewalld` - part of systemd suite. It's controlled with the `firewall-cmd`
  command.

### iptables

The rules are stored in a files. They are split into:

- tables
  - chains

The rules have one of the following outcomes:

- ACCEPT - packet is accepted
- DROP - packet is dropped
- RETURN - stops traversal of the current chain and goes back to the previous
  one
- LOG - logs the packet that executed the rule
- switch to another chain


::: warning Persistance
The rules are stored in memory. We need to explicitly persist them to have them
working after a restart.
:::

There are some default tables: filter, NAT, Mangle.

::: danger IPv6
iptables does not handle IPv6. There is a separate package for that: ip6tables.
:::

#### Filter Table

::: tip Default
Filter table is the default one.
:::

The Filter table has has 3 chains:

- Input - for inbound packets
- Output - for outbound packets
- Forward - for packets that need to be sent elsewhere (router)

We can see the defined rules with `iptables -L -v`.

The order of the rules matters, since they are examined from top to bottom. We
should put the rules that are to be the most relevant in our scenario close to
the top, for better performance.

::: tip Accept
By default, if a packets goes through all of the rules and none is matched, it
will be ACCEPTed.

We can change that with `iptables –P INPUT DENY`.
:::

#### NAT Table

The NAT table is used for the NAT operation, which is all about switching
source/destination IP addresses (just like router gateways do that at homes).

The usual config is like this:

```sh
iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE
```

The MASQUERADE target will use the IP address of eth1 for all traffic that
leaves eth1.

![](./assets/nat.png)


#### Mangle Table

The Mangle table is used to modify packets.

---

#### Logs

The **LOG** target of the rule saves the logs in a file. In Ubuntu (our example
OS), they are added to /var/log/
kern.log. In Red Hat or Fedora, look for them in /var/log/messages.

### nftables

It's a modern replacement for iptables. It contains CLI and API (HTTP?).

The rules added via CLI are not persisted. To persist them, they should be added
to `/etc/nftools.conf`. We can also create more files and `Include` them in the
`/etc/nftools.conf` file.



## Sources

- [Linux for Networking
  Professionals](https://www.packtpub.com/product/linux-for-networking-professionals/9781800202399)
- [Linux firewalls: What you need to know about iptables and firewalld
(opensource.com)](https://opensource.com/article/18/9/linux-iptables-firewalld)
