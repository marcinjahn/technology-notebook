---
title: gRPC
description: gRPC in .NET
tags: .net, asp.net, dotnet, grpc
lang: en-US
---

# gRPC in .NET

Go [here](/technologies/networking/grpc.md) for a general overview of gRPC.

We can create a new gRPC server project with `dotnet new grpc`.

## Proto Files

The `.proto` files are needed by both the server and the client(s). They define
the contract. These files contain:

- some metadata (like version of protobuf)
- listing of endpoints under `service`
- shape of the data (`message`)

```protobuf
syntax = "proto3";

option csharp_namespace = "MyNamespace.gRPC";

import "google/protobuf/Timestamp";

service MeterReadingService {
    rpc AddReading (ReadingPacket) returns (StatusMessage);
}

message ReadingPacket {
    repeated ReadingMessage Readings = 1;
    ReadingStatus Successful = 2;
}

message ReadingMessage {
    int32 CustomerId = 1;
    int32 ReadingValue = 2;
    string Notes = 3;
    google.protobuf.Timestamp ReadingTime = 5;
    reserved 4;
    reserved 'Successful'
}

message StatusMessage {
    ReadingStatus Success = 1;
    string Message = 2;
}

enum ReadingStatus {
    Unknown = 0;
    Success = 1;
    Failure = 2;
}
```

::: tip Empty Response
There's a type that represents empty content - `google.protobuf.Empty`. We could
use that if our rpc(s) did not return any data.
:::

### Service

Under `service`, the endpoints are listed that the server will be offering, and
the client will be able to hit. The endpoints can make use of `message` types.

### Message

The `message` is used to define our structs. The numbers are used for ordering
of the fields.

The types that we can use are either built-in ones, defined by us, or defined by
3rd party. Above, we're using `google.protobuf.Timestamp` that comes from an
import.

If some component of a message is a collection we should add the `repeated`
keyword.

### Enum

The `enum` component works like enumerations in programming languages. The
numbers are no longer about ordering. They are the actual values that will be
used to represent the enums (like in C#).

## .NET

### Auto-generated Files

#### Visual Studio

In Visual Studio, we can add gRPC Connected Service. There, we point at out
`.proto` file and VS generates various files for us and pulls the needed NuGet
packages. We have an option to generate Client or Server stuff.

#### dotnet-grpc

There's also a tool that does pretty much the same things as Visual Studio does.

```sh
dotnet tool install dotnet-grpc -g
```

Then, we can add `.proto` files to our project with `dotnet grpc add-file`. It
will also install necessary NuGet dependencies, and generate classes. More info
is on [MSDN](https://docs.microsoft.com/en-us/aspnet/core/grpc/dotnet-grpc).

#### Server

If we selected the **Server** option, one of the generated file types is the
classes for the `services` that we defined in our protobuf file. The files are
called the same as the service was called in the `.proto` file with the `Base`
suffix. These are base classes that we can inherit from when building our actual
classes that are going to handle gRPC communication. The base classes contain
methods for the rpc procedures that we've defined in the `.proto` file.

```cs
public class MeterReadingService : MeterReadingServiceBase
{
    public override async Task<StatusMessage> AddReading(
        ReadingPacket request, ServelCallContext context)
    {
        // Do something...
    }
}
```

Another generated type of files are the classes for the `messages` we've defined
in protobuf.

#### Client

For the **Client** choice, what gets generated is a class representing gRPC
client for the gRPC service from the protobuf file. The name is based on the
`service` name from the protobuf file with the `Client` suffix.

```cs
var channel = GrpcChannel.ForAddress(url); // the client requires a channel
var client = new MeterReaderServiceClient(channel);
client.AddReading(...);
```

### Startup

When our gRPC service is ready, we need to register it in ASP.Net Core.

We shoulda add the gRPC services:

```cs
builder.Services.AddGrpc();

// Useful for debugging:
// builder.Services.AddGrpc(options => options.EnableDetailedErrors = true);
```

We also need to map our own service as an endpoint:

```cs
app.MapGrpcService<MeterReadingService>();
```

With that setup, gRPC requests will be handled by our class.

### Streaming

If our protobuf supports streaming, we can implement it in .NET as well.
We can have uni- or bi-directional streaming.

Here's an example of protobuf with streaming:

```protobuf
service MeterReadingService {
    rpc AddReadingStreaming (stream ReadingPacket) returns (stream ErrorMessage);
}
```

The rpc above represents a bi-directional stream. If we wanted to have
uni-drectional stream:

- from the client - just the input should have a `stream`
- from the server - just the output should have a `stream`

#### Server class

The auto-generated base class will have a method that we'll need to override:

```csharp
public async override Task AddReadingStream(
    IAsyncStreamReader<ReadingMessage> requestStream,
    IServerStreamWriter<ErrorMessage> responseStream,
    ServerCallContext context)
{
    while (await requestStream.MoveNext())
    {
        // INPUT STREAM
        var msg = requestStream.Current;

        // Do something...
        // For example:
        if (msg.ReadingValue < 100)
        {
            // OUTPUT STREAM
            await responseStream.WriteAsync(new ErrorMessage("Value less than 100"));
        }
    }
}
```

The client-side code is very similar.

## Authorization

The "standard" auth flow of ASP.NET Core works in gRPC as well. The service
classes on the server side may be decorated with the `[Authorize]` annotation,
similarly to the HTTP Controllers (what about individual rpc methods?).

## References

[Pluralsight](https://app.pluralsight.com/library/courses/aspdotnet-core-6-using-grpc/)