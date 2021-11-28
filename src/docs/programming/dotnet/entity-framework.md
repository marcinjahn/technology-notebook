---
tags: .net, entity framework
---

# Entity Framework Tips

A class inheriting `DbContext` is needed.

## Seeding

One way is to override `OnModelCreating` method of `DbContext`:

```csharp
protected override void OnModelCreating(ModelBuilder builder)
{
    builder.Entity<Value>()
        .HasData(
            new Value { Id = 1, Name = "Value 101" },
            new Value { Id = 2, Name = "Value 102" },
            new Value { Id = 3, Name = "Value 103" }
        );
}
```

Downside of this is that we need to manually type the ids. Another way is to
create seperate class for seeding:

```csharp
public class Seed
{
    public static void SeedData(DataContext dbContext)
    {
        if (!dbContext.Activities.Any())
        {
            //Create some data...
            dbContext.Values.AddRange(values);
            dbContext.SaveChanges();
        }
    }
}
```

Then, we can run it from `Program` of our application:

```csharp
public static void Main(string[] args)
{
    var host = CreateHostBuilder(args).Build();
    using (var scope = host.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<DataContext>();
            context.Database.Migrate(); //auto-migration running on every startup to make sure DB is in sync
            Seed.SeedData(context);  //auto-seeding the DB with exemplary data if there is no data in DB
        }
        catch (Exception e)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(e, "An error occured during migration");
        }
    }

    host.Run();
}
```

Ids are generated automatically. Example above also shows how to **run
migrations on every application startup**.

## SQLite

It's good idea to use Sqlite in a prototype. It's files based DB. Registering
DbContext:

```csharp
services.AddDbContext<DataContext>(options =>
{
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
});
```

The `GetConnectionStrings` method is just looking for `ConnectionStrings`
section in `appsettings.json`. Exemplary `appsettings.json`:

```json
{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    },
    "AllowedHosts": "*",
    "ConnectionStrings": {
        "DefaultConnection": "Data source=reactivities.db"
    }
}
```

`reactivities.db` is the name of SQLite DB file.

## Async

It's a good idea to get data using async methods, i.e.:

```csharp
public async Task<ActionResult<IEnumerable<Value>>> Get()
{
    var values = await _dbContext.Values.ToListAsync();
    return Ok(values);
}
```

## Adding records

`DbSet` has an asynchronous `AddAsync` method. However, it should be used only
in cases where value generators are used. It's adviced to use `Add` (synchronous
method) in other cases.

## DB modification success

It's a good idea to use the following strategy for finding out if saving changes
in DB was successful:

```csharp
_dbContext.Activities.Add(activity);
var success = await _dbContext.SaveChangesAsync() > 0;

if (success) return Unit.Value;
else throw new Exception("Problem saving changes");
```

`SaveChangesAsync` returns a number of changes done in DB.