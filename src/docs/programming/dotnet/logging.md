---
title: Logging
description: Using Serilog in .NET
tags: .net, asp.net
lang: en-US
---

# Logging in .NET

## Structured Logging

When logging and using a provider that supports structured/semantic logging, we
should provide parameters the following way:

```csharp
// GOOD
_logger.LogInformation("User {userId} logged in", userId);

// BAD
_logger.logInformation($"User {userId} logged in");
```

The first way stores both the value of the parameter (the actual user
identifier) and the name of this parameter. In the second approach, the name is
lost, so we are not able to filter based on the named parameter (`userId`).

::: tip JSON
The structured logging information is stored as JSON. For example:

```json
{
    "eventLevel": "Information",
    "category": "Device.IoTHubService",
    "eventId": "1543",
    "messageTemplate": "Device {deviceId} has connected to IoT Hub",
    "message": "Device 123 has connected to IoT Hub",
    "deviceId": "123"
}
```
:::

### Log Storage

Structured logs can be stored in systems like:

- Elasticsearch
- Seq

## Serilog

Using Serilog:

1. Install Serilog and required sinks via NuGet
2. Use Serilog

    ```csharp
    Log.Logger = new LoggerConfiguration()
        .WriteTo.Console() // Console sink
        .CreateLogger();

    var builder = WebApplication.CreateBuilder(args)
        .UseSerilog();
    ```

### Using Serilog in Program.cs

```csharp
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

try
{
    // Run the app...
}
catch(Exception e) 
{
    Log.Fatal(e, "Host terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
```

## Logging to files with Serilog

```csharp
public static void AddLogging(this IServiceCollection services, AppConfiguration appConfiguration)
{
    services.AddLogging(services, builder => {
        builder.SetMinimumLevel(appConfiguration.LogLevel);
        builder.AddSerilog(builder, GetSerilogLogger(appConfiguration), true);
    });
}

private static Serilog.Core.Logger GetSerilogLogger(AppConfiguration appConfiguration)
{
    var configuration = Serilog.ConsoleLoggerConfigurationExtensions.Console(
        new Serilog.LoggerConfiguration()
            .MinimumLevel.Verbose()
            .WriteTo);

    if(appConfiguration.LogToFile)
    {
        Serilog.FileLoggerConfigurationExtensions.File(configuration.WriteTo, appConfiguration.LogPath);
    }

    return configuration.CreateLogger();
}
```