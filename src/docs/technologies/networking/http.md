---
title: HTTP Protocol
---

# HTTP Protocol

## Typical Request

Here's how a typical HTTP request looks like (up to some level of abstraction).
The assumptions are:

- the PC and the web browser are "fresh", DNS caches are empty
- max HTTP/2 is used (no QUIC)
- we're making a request to "example.com"
- "example.com" record exists in HSTS

1. "example.com" is a domain name. The networking stack needs IP address, so
   we're going to reach out to DNS for the IP address
    1. On Linux, `nsswitch.conf` file is checked to find out about the sources
      of DNS entries. It could be the `/etc/hosts` file, and some DNS service
    2. Most likely, we'll reach out to some external DNS service, which is either
      configured by us or by DHCP.
    3. We send a request to DNS (let's skip the process of resolving MAC addresses
      with ARP). DNS uses UDP on port 53.
    4. DNS respons to us with the IP address. The IP address could be found either
      in our DNS service or the service could reach out to some other DNS service
      for the IP.
2. With the IP address, we can start to establish a [TCP connection](./tcp) with
   the "example.com" server.
    1. 3-way handshake occurs and sockets are created on the client and the server
      (IP-port pairs).
3. [HSTS](./hsts) can jump in forcing us to use HTTPS (let's assume that it
   happened). We need to establish TLS session.
4. The client will start the TLS session with the server. Depending on the TLS
   version used, a proper handshake procedure will occur.
    - if TLS 1.3 is used:
        1. There is a 2-way handshake. The client sends "Client Hello" including:
          D-H parameters, SNI (encrypted), ALPN.
        2. The server responds with "Server Hello" including: D-H parameters,
          [X.509
          certificate](/technologies/security/cryptography/basic-terms.md#x-509)
          (based on SNI).
    - if TLS 1.2 is used:
        1. There is a 4-way handshake. The client sends "Client Hello" including:
          protocols info, SNI.
        2. The server responds with "Server Hello" including: [X.509
          certificate](/technologies/security/cryptography/basic-terms.md#x-509),
          protocol choices.
        3. Client sends the symmetric key (which is why TLS 1.3 is preferred)
        4. Server FIN
5. With the TCP and TLS established, the client can send the actual HTTP request
   containing all the necessary content.
6. The server responds with a proper HTTP response.

## Simple Implementation

HTTP is all about sending appropriately formatted messages over TCP (unless
HTTP/3 is used). A simple HTTP server implementation shows it quite well:
[Medium](https://medium.com/from-the-scratch/http-server-what-do-you-need-to-know-to-build-a-simple-http-server-from-scratch-d1ef8945e4fa).

## Versions

**HTTP/1.0** was establishing a separate TCP connection per each request -
expensive - every CSS, image, etc. of a website had to be fetched through a
separate TCP connection.

**HTTP/1.1** introduced:

- `Host` header containing the target domain. Without this, proxies could not
  work (they wouldn't know where to send the request)
- `keep-alive` header, which reused a connection when loading content
  (*persisted TCP connection*). The server understands it and keeps the TCP
  connection open
- `ETag` caching.
- *Streaming* of content.

**HTTP/2** introduced:

- compression
- multiplexing - client joins his requests into one request
- always HTTPS (TLS)
- ALPN - negotiates protocol during the TLS handshake

**HTTP/3** introduced:

- uses QUIC (UDP with Congestion control) instead of TCP, making the amount of
  communication much smaller, resulting in reduced latencies.

## Browser Storage

![](https://i.imgur.com/UXLpHD2.png)

The main diference is that cookies are sent to servers, while localStorage and
sessionStorage stay on the client only. Also, localStorage stays in forever.

## Proxying

### HTTP Proxy

It needs to be configured on the client. When I send any HTTP request, it's
going to be modified in a layer 3. The IP address will be set to the IP address
of the proxy. The proxy will receive my request (on TCP connection 1), and by
inspecting the layer 7 data it will see what request I wanted to make. It will
create another TCP connection (with the target server), get the data, and send
it back to me (on TCP connection 1). The target server does not know that the
client was behind a proxy.

Reference: https://www.youtube.com/watch?v=x4E4mbobGEc

### HTTPS Proxy

The proxy needs to see what domain we want to access. This information is
decrypted though. To go around that, the proxy needs to offer TLS termination
and provide a certificate that the client needs to trust.

![](https://i.imgur.com/vdj2Ebz.png)

Reference: https://www.youtube.com/watch?v=PAJ5kK50qp8

### HTTP CONNECT proxy

1. First, a client sends HTTP CONNECT to the proxy with domain of the target
   server.
2. The proxy establishes a TCP connection with the target server and returns
   success to the client
3. For any packet sent from the client to the proxy, proxy hanges the source IP
   to itself and sends this packet via the previouslu established TCP connection
   to the target server.
4. Any response from the target server gets its source IP modified to the
   proxy's IP and sent back to the client.

The communication is end-to-end, the proxy does not see the encrypted content.
Te proxy knows only the domain we're communicating with.

Proxies may be chained, so that a proxy has its own proxy:

![](https://i.imgur.com/J7mOhkO.png)

## Enforcing HTTPS

There are at least two ways to enforce HTTPS:

- Redirect from HTTP to HTTPS on your server
- Use [HSTS](./hsts) - it's a header that informs the browser to ALWAYS use HTTPS when
  reaching the app.

::: tip ASP.NET Core
ASP.NET Core has built-in middleware for both of the points above.
:::

HSTS should be used only if we do not plan to make use of HTTP in the app.
Otherwise we can make it impossible for the users to reach the HTTP endpoints.

HSTS should not be used in development.