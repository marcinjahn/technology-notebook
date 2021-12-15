---
title: Configuration
description: How configuration works in .NET
tags: .net 
lang: en-US
---

# .NET Configuration

## Nuget packages:

- Microsoft.Extensions.Configuration;
- Microsoft.Extensions.Configuration.Files.Json
- Microsoft.Extensions.Configuration.Binder

## Building

```csharp
private static AppConfiguration GetConfiguration()
{
    var rawConfig = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

    return ConfigurationBinder.Get<AppConfiguration>(rawConfig);
}
```