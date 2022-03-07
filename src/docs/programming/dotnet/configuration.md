---
title: Configuration
description: How configuration works in .NET
tags: .net 
lang: en-US
---

# .NET Configuration

The configuration system depends on configuration providers - the sources of
configuration data.

## Options

```csharp
services.Configure<MyOptions>(Configuration.GetSection("MyOptions"));
```

The `IOptions<T>` instance is registered as a singleton.

::: tip Reloading
To support configuration providers that can be reloaded during runtime, we can
inject `IOptionsSnapshot<T>` instead of `IOptions<T>`.
:::

The class for out options needs to have properties that:

- are public
- have getters
- have setters (or non-null value if complex type)
- are not indexers

::: tip IEnumerable
An `IEnumerable<T>` property that is initialized cannot be bound to. That's
becasue `IEnumerable<T>` does not have the `Add` method.
:::

## Without Options

### Nuget packages:

- Microsoft.Extensions.Configuration;
- Microsoft.Extensions.Configuration.Files.Json
- Microsoft.Extensions.Configuration.Binder

### Building

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