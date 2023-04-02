---
title: gRPC
description: gRPC communication
tags: ["networking", "grpc", "protobuf"]
lang: en-US
---

# gRPC

gRPC - GRPC Remote Procedure Call. The "G" could also just stand for "Google"
which is one of the main drive forces behind the protocol. It's a high
performance, open-source universal RPC framework. gRPC uses Protocol Buffers v3.

**Highlights:**

- high serialization/deserialization performance (especially deserialization
  when compared to JSON)
- wide adoption in programming languages
- binary communication (no JSON, XML, whatever) - small size
- contract-based
- requires HTTP/2 (HTTPS by default)
- uni- and bi-directional streaming
- great for low-power devices (IoT)

**Usage:**

- backend-to-backend communication, e.g. between microservices

Usage on the frontend is not as straightforward as with REST.

## Contracts

The Server and the Client are generated using the ProtoBuf.

### ProtoBuf

**Protocol Buffers (ProtoBuf)** is a language for defining interfaces.

- language/platform neutral
- extensible
- serializable
- not specific to gRPC

It comes with its own set of types for defining data.

### Example

Request:

```
1: 100
2: "Hello There"
```

Response:

```
1: 94.5
2: 15.4
3: .5
```

## Streaming

Thanks to HTTP/2 base, gRPC supports streaming. It's very similar to how
websockets work. The streaming works in any direction (client -> server or
server -> client), it can also be both ways at the same time.

To support streaming, the protobuf file needs to explicitly contain such
information attached to the input of the chosen rpc.

## Usage

### .NET

Read [here](/programming/dotnet/grpc.md).

### gRPC-Web

gRPC-Web is the way to call gRPC servers from the frontend layer (from JS).
ASP.NET Core supports it via an additional NuGet package.

## Tools

- [BloomRPC](https://github.com/bloomrpc/bloomrpc)- "Postman" for gRPC

## References

[Pluralsight](https://app.pluralsight.com/library/courses/aspdotnet-core-6-using-grpc/)
[A nice intro to
protobuf](https://grapeup.com/blog/protobuf-how-to-serialize-data-effectively-with-protocol-buffers/#)