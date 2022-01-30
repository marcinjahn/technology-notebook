---
title: .NET Generic Host
description: How to use Generic Host in console apps
tags: .net
lang: en-US
---

# .NET Generic Host

App uses an implementation of `IHostedService` to run.

## Imports

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;
```

## Creating an `IHostBuilder`

Simple:

```csharp
private static IHostBuilder GetHostBuilder(string[] args)
{
    return Host.CreateDefaultBuilder(args)
        .ConfigureServices((hostContext, services) =>
        {
            services.AddSingleton(hostContext.Configuration.GetSection("AppConfiguration").Get<AppConfiguration>());
            services.AddHostedService<InfluxCompleteSetupService>();
        });
}
```

With configuration:

```csharp
private static IHostBuilder GetHostBuilder()
{
    var builder = new HostBuilder()
        .ConfigureAppConfiguration((hostBuilderContext, configBuilder) =>
        {
            configBuilder.AddJsonFile("appsettings.json", optional: true);
            configBuilder.AddEnvironmentVariables();
        })
        .ConfigureServices((hostBuilderContext, services) =>
        {
            services.AddAllServices(hostBuilderContext.Configuration.GetSection("AppConfiguration").Get<AppConfiguration>());
        })
        .ConfigureLogging((hostBuilderContext, loggingBuilder) =>
        {
            loggingBuilder.AddConfiguration(hostBuilderContext.Configuration.GetSection("Logging"));
            loggingBuilder.AddConsole();
        });

    return builder;
}
```

## Running the application

```csharp
static async Task Main(string[] args)
{
    try
    {
        var builder = GetHostBuilder(args);
        await builder.RunConsoleAsync(options => options.SuppressStatusMessages = true);
    }
    catch (Exception e)
    {
        Console.WriteLine("Program run into an exception");
        Console.WriteLine(e.Message);
        Console.WriteLine("Press any key to exit");
        Console.ReadKey();
    }
}
```

.NET 6:

```csharp
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

try {
    using var host = Host.CreateDefaultBuilder(args)
        .ConfigureServices((_, services) =>
            services
                .AddSingleton<InputReader>()
                .AddSingleton<BmiCalculator>()
                .AddHostedService<App>())
        .Build();
    
    await host.RunAsync();  
}
catch (Exception e)
{
    Console.WriteLine("Program run into an exception");
    Console.WriteLine(e.Message);
    Console.WriteLine("Press any key to exit");
    Console.ReadKey();
}
```

## The Hosted Service

The actual service that will be run needs to implement `IHostedService` or
inherit from `BackgroundService`.

### Terminating the app

The hosted service can terminate the app when finished the execution. An
instance of `IHostApplicationLifetime` needs to be injected and used:

```csharp
_logger?.LogInformation("Terminating Application");
_applicationLifetime.StopApplication();
```