---
tags: networking, tcp, transport
title: TCP Procol
description: TCP Protocol of the Networking stack
---

# Transport Control Protocol (TCP)

Allows 2 endpoints to exchange data reliably ovet the network. It is a Transport
(4th) layer of OSI.

## Pros

- **acknowledgment** - parties have to confirm that the data got received.
  Thanks to it, there is a guarantee of delivery
- **congestion control** - 
- **ordered packets** - TCP will put all packets in order when they get received

## Cons

- **larger packets** - all of the control requires a lot of information to be
  sent over the wire. Because of that, it takes more bandwidth and it is slower
  than UDP
- **stateful** - restarting a server in the middle of some information
  transmission will require the transmission to be started again.
- **server memory** - because of connection being stateful, the server's memory
  get filled up with all the connections.

## Connection

Connection between two computers is identified by:

- source IP
- source port
- destination IP
- destination port

Both machines (clisent and server) stores information about the established
connection.

## Connection States

TCP has 11 possible connection states:

- **Closed** - there's no connection yet
- **Established** - connection open with 3-way handshake. We can begin to use it
- **Time Wait** - We shut down the connection and we need to wait until we can
  use it again (?)
- ...

## TCP Handshake

1. _Client_ sends **SYN** to the _Server_. the values being sent:
    - **Initial Sequence Number**
    - Flags: SYN
    - Window size - max buffer size that the client can receive at once
    - TCP Options:
        - max segment size - MSS - (1460)
        - windows scale - 2^number to multiply the "window size" to get the
          actual size (0-14)
        - timestamps
        - SACK permitted (Selective ACKnowledgments)
2. *Server* sends **SYN/ACK** back to the _Client_. Values sent:
    - Flag: SYN and ACK (acknowledgement of Client's SYN)
    - Windows Size - max buffer size that the Server can receive at once
    - TCP Options:
        - max segment size - MSS - (1460)
        - SACK permitted
        - window scale - 2^number to multiply the "window size" to get the
          actual size (0-14)

    Based on the comparison of TCP Options of Client and Server, the actual
    options are chosen (support for timestamps, SACK, etc.) so that both parties
    can handle the communication. Some values can vary, like max segment size.

    Sometimes the network might have further restrictions and, i.e. a router
    might change the MSS to some lower value.

3. *Client* sends **ACK** to the *Server*.

## Receive Window Size

Both the client and the server send their window sizes, which is an amount of
space in the buffer. Based on that the other side might decide how much data to
send in a packet. It's not uncommon to see client-side receive window size to be
bigger than the server's receive window size. That's because usually clients
receive most of the data.

Every TCP connection has a separate receive window buffer. That's why the amount
of connections is limited.

Client and server communciate their window sizes in every packet. This number
might descrease and increase as the buffer gets smaller or bigger.

Maximum window size is around 1GB.

### Zero Window Size

If the receiver of data is not able to keep up with the amount of data it
receives, the buffer might be filled up completely. In such case, the receiver
would send "0" as its receive window size. The server would wait for the client
to report that there is some space. If client doesn't send anything like that,
the server can ask about it.

Such situation can happen when the receiver runs out of resources and it cannot
efficiently handle the receive buffer.

Ideally, the window size should be set so that the communication does not stop
due to lack of buffer space and the client should send ACKs before the server
stops transmitting bytes.

## Retransmissions

### Time-based (Standard Retransmission)

 WHen a server transmits a packet of data, it sets a timer. If there is no ACK
 from the client by the time the timer runs out, the server will retransmit the
 data.

### Fast Retransmission

It requires the SACK option. If the server sees 2-3 duplicate ACKa, it'll do a
retransmission. This is caused by the network delay, when packets travel slow.

### Spurious Retransmission

Server resends a packet that has already been received. It might happen due to
undelivered ACK, so that server thinks that the packed was not acknowledged.


