---
tags: .net, asp.net
---

# .NET Logging

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