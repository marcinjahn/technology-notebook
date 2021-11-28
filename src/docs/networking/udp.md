---
title: UDP Protocol
tags: networking
---

# UDP

It's a layer 4 protocol of OSI. It's much lighter than TCP.

## Pros

- **Smaller Packets** - less bandwidth
- **Fast** - due to less features and smaller packets
- **Stateless** - no connection needed, sender just sends data. If the server
  restarts, it will continue receiving the data.

## Cons

- **No Acknowledgment** - the sender does not know if the receiver received the
  bytes. Hence, there's no delivery guarantee
- **Connectionless**
- **No Congestion Control** - UDP will send packets no matter what the traffic
  is
- **No Ordering** - packets may be received out of order
- **Low Security** - due to connectionless nature, receiver does not know
  anything about the sender. Some firewalls disable UDP due to it.