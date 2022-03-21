---
title: Overview
description: Overview of Entity Framework Core
tags: .net, C#, entity framework, core, dotnet
lang: en-US
---

# Overview of Entity Framework Core

EF Core is the official .NET data access technology. It's an ORM (Object
Relational Mapper), providing some framework for how to work with the data
layer.

## NuGet

- `Microsoft.EntityFrameworkCore` - just the core logic, no providers;
- `Microsoft.EntityFrameworkCore.SqlServer` - SQL Server provider, installing it
  will also pull in the above package as its dependency.

## DbContext

```csharp
public class SamuraiContext : DbContext
{
    public DbSet<Samurai> Samurais { get; set; }
    public DbSet<Quote> Quotes { get; set; }
}
```

The tables names are inferred from the DbSet names.

### Connection

In EF Core we need to explicitly provide info on which provider to use and what is the connection string.
Here's the simplest way to do it:

```csharp
public class SamuraiContext : DbContext
{
    public DbSet<Samurai> Samurais { get; set; }
    public DbSet<Quote> Quotes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost;Database=SamuraiAppData;User Id=sa;Password=Qwerty1!;");
    }
}
```

## Migrations

Every change of data model is a prompt to do a migration. This way the
database's shape corresponds to our code model.