---
tags: networking, http, websocket
description: WebSocket
title: WebSocket
---

# {{ $frontmatter.title }}

WebSocket surfaced in the era of HTTP/1.1. The basic idea is to enable
bi-directional communication between the client and the server under a single
TCP connection. Instead of relying on the traditional request-response model,
under WebSocket both parties can send messages freely.

::: tip SignalR
WebSocket is one of the ways how SignalR transfers data. There are also other
transport protocols supported, but WebSocket is the preferred one.
:::

Use cases:

- chatting
- currencies exchange
- live feed of a sports event
- gaming

## Establishing Connection

After the "normal" TCP connection gets established, the client has to send a
**GET (UPGRADE)** request that asks the server to switch to WebSocket. The
server responds with **101 (Switching Protocols)**. After that, both parties can
communicate via WebSocket.

Here's an example of how the upgrade looks like in the HTTP protocol (taken from
the [Wikipedia](https://en.wikipedia.org/wiki/WebSocket)):

Client request (just like in HTTP, each line ends with `\r\n` and there must be
an extra blank line at the end):

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

Server response:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

## Sources

- [Wikipedia](https://en.wikipedia.org/wiki/WebSocket)