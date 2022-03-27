---
title: Testing
description: Writing tests that involve Entity Framework Core
tags: .net, C#, entity framework, core, dotnet, testing
lang: en-US
---

# Testing with EF Core

## Real DB

```csharp
[TestMethod]
public void CanInsertSamuraiIntoDatabase()
{
    using var context = new SamuraiContext();
    context.Database.EnsureDeleted();
    context.Database.EnsureCreated();

    var samurai = new Samurai {Name = "Test"};
    context.Samurais.Add(samurai);
    context.SaveChanges();
    
    Assert.AreNotEqual(0, samurai.Id);
}
```

## InMemory Provider

It emulates an RDBMS via in-memory lists. It's quite simple though, it does not
support things such as raw SQL.

```csharp{5}
[TestMethod]
public void CanInsertSamuraiIntoDatabaseWithInMemoryDB()
{
    var builder = new DbContextOptionsBuilder<SamuraiContext>();
    builder.UseInMemoryDatabase("CanInsertSamurai");
    
    using var context = new SamuraiContext(builder.Options);

    var samurai = new Samurai {Name = "Test"};
    context.Samurais.Add(samurai);
    Assert.AreEqual(EntityState.Added, context.Entry(samurai).State);
}
```

When configuring in-memory database, we need to provide a name for it. This way,
we can use the same in-memory DB from multiple testse (or different ones, with
different names).

::: warning SaveChanges
`SaveChanges` method doesn't do anything when using in-memory DB. The ID gets
assigned to the entity as soon as we add it to the `DbSet`.
:::