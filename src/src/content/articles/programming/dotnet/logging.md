---
title: Logging
description: Using Serilog in .NET
tags: [".net", "asp.net"]
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

:::tip[JSON]
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

1. Install NuGet packages:

    ```sh
    dotnet add package Serilog.Sinks.Console # Console sink
    dotnet add package Serilog.Settings.Configuration # allows reading settings from a file
    dotnet add package Serilog.Extensions.Logging # DI
    ```

2. Use Serilog with DI

    ```csharp
    var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((host, services) =>
    {
        services.AddLogging(builder =>
        {
            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(host.Configuration) // Serilog.Settings.Configuration
                .CreateLogger();

            builder.ClearProviders(); // removes the default logger
            builder.AddSerilog(logger);
        });
        
        // Other services...
    })
    .Build();
    ```

3. Configure

    In `appsettings.json`:

    ```json
    {
        "Serilog": {
            "Using":  [ "Serilog.Sinks.Console" ],
            "MinimumLevel": "Debug",
            "WriteTo": [ "Console" ]
        }
    }
    ```

    More information can be found
    [here](https://github.com/serilog/serilog-settings-configuration).

:::tip[Rider]
Sometimes Rider may display logs in black font color on the dark background. To
change that, got to the "Preferences -> Editor -> Color Scheme -> Console
Colors" and change "Bright White" color to **#FFFFFF**.
:::

### Usage without Dependency Injection

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

### Logging to files with Serilog

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