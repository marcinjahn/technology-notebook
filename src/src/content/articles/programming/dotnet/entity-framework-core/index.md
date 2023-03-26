---
title: Overview
description: Overview of Entity Framework Core
tags: [".net", "c#", entity framework, core, dotnet]
lang: en-US
---

# Overview of Entity Framework Core

EF Core is the official .NET data access technology. It's an ORM (Object
Relational Mapper), providing some framework for how to work with the data
layer. It allows accessing Tables, Stored Procedures, Views, and more.

## NuGet

- `Microsoft.EntityFrameworkCore` - just the core logic, no providers;
- `Microsoft.EntityFrameworkCore.SqlServer` - SQL Server provider, installing it
  will also pull in the above package as its dependency.
- `Microsoft.EntityFrameworkCore.Design` - a package that is needed for invoking
  migrations

## DbContext

```csharpharp
public class SamuraiContext : DbContext
{
    public DbSet<Samurai> Samurais { get; set; }
    public DbSet<Quote> Quotes { get; set; }
}
```

The tables names are inferred from the `DbSet<>` names. 

::: tip Optional DbSet
The `DbSet` properties are not required. We can have a table without a `DbSet`
pointing to it. `DbSet` is a convenience that:

- simplifies navigation to that table from the `DbContext`
- provides a name for the table

Without a `DbSet` defined in the `DbContext`, we can retrieve it as follows:

```csharpharp
var set = context.Set<BattleSamurai>();
```
:::

### SaveChanges

The `DbContext` tracks changes so that they can be applied when we call
`SaveChanges()` on it.

A `SaveChanges()` call applies all the requests to the database wrapped in a
transaction, so failure of some requests will not corrupt the database.

### NoTracking

In some cases, we're not interested in `DbContext`'s tracking capabilities,
especially when building web APIs where we often fire some query to the DB and
dispose of the connection. In such cases we can enable **NoTracking** to improve
performance.

We can do that in a few ways:

- in queries - useful when we normally want tracking, but for some specific
  query we don't:

    ```csharpharp
    var samurai = _context.Samurais.AsNoTracking().FirstOrDefault();
    ```

- on `DbContext` - makes all queries NoTracking by default:

    ```csharpharp{5}
    public class MyContext: DbContext
    {
        public MyContext()
        {
            ChangeTracker.QueryTrackingBehaviour = QueryTrackingBehaviour.NoTracking;
        }
    }
    ```

- in Dependency Injection registration:

    ```csharpharp{5}
    builder.Services.AddDbContext<SamuraiContext>(options =>
    {
        options
            .UseSqlServer(builder.Configuration.GetConnectionString("SamuraiDb"))
            .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    });
    ```

::: tip Only Queries
The above methods only impact the tracking of entities that are being queried
via EF Core. Entities being added or updated are still being tracked, which is a
good thing. Otherwise, we'd have to set any entity as "Modified" or "Added"
explicitly every time.
:::

### Connection

In EF Core we need to explicitly provide info on which provider to use and what
is the connection string. Here's the simplest way to do it:

```csharpharp
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

In a real scenario, we'd obviously not hardcode the connection string.

## Conventions

EF Core has a bunch of conventions that are applied by default. Here're some of
them:

- Property called `Id` or `<Class>Id` will become a Primary Key
- for every Foreign Key, an index is created
- a `string` type is turned into `nvarchar(MAX)` in the DB (that's a default
  from SQL Server provider, not the EF Core itself)
- When C#'s Nullable feature is enabled, reference types are "not nullable" by
  default - the same applies to DB table's columns
- DB tables names come from `DbSet`'s name or, if `DbSet` was not defined, from
  a class's name.

    ```csharpharp
    // We can also name the table whatever we want
    modelBuilder.Entity<Horse>().ToTable("MyHorses");
    ```

The conventions can be tweaked with:

- Data Annotations
- Fluent API (more powerful)

## Migrations

Every change of data model is a prompt to do a migration. This way the
database's shape corresponds to our code model. Migrations are files and they
are supposed to land in the VCS.

Migrations history is kept in the DB itself, in the "__EFMigrationsHistory"
table.

### Creating Migration

Command: `dotnet ef migrations add <NAME>`. It should be invoked from a
directory of a .NET project containig `DbContext`.

::: tip DbContext Initialization
The command tries to instantiate `DbContext`. By default it looks for that logic
in the project in the current directory. If a different .NET project has this
logic (e.g. some ASP.NET Core project), we need to point to it. Here's an
example:

```sh
dotnet ef migrations add -s ../WebApi/WebAPI.csproj MyMigration
```
:::

When adding a migration, the file `Migrations/*ModelSnapshot.cs` is loaded and
compared with the current `DbContext`. Based on the difference between these, a
new migration file is generated.

::: tip First Migration
When the first migration is being created, the `*ModelSnapshot.cs` file will be
created as well.
:::

A migration file's name contains a timestamp and migrations's name. It is a
class with 2 methods:

- `Up` - work to do when the migration is applied
- `Down` - work to do when the particular migration is revoked

::: danger DROP
In cases when we have data in the DB, we should always look at the migration file
to make sure that it's going to do only what we expected. In some cases, after
changing various names, it might happen that the migration will `DROP` a table
and recreate it, which would be a loss of existing data.
:::

::: tip Empty Migrations
If we have a specific case we can create an empty migration and code the logic
of that migration directly in its file. E.g., we could use
`migrationBuilder.Sql()` method to provide some [SQL to be executed](#raw-sql).
:::

### Applying Migration

The EF Tool can either execute the migration (good in DEV), or it can generate
an SQL file with all the migration steps (good for PROD) - we can then execute
it later on.

Generating a script: `dotnet ef migrations script <FROM> <TO>` - the SQL is
printed to stdout. We can specify the migration to start from and the one we
want to get to. By default it would generate SQL for all the migrations.

::: warning Creating database
When applying migration with EF tool directly, it makes sure that the database
exists and creates it if needed. When using the SQL script, it's our
responsibility to provide an existing database.

A fragment of logs when running the `dotnet ef database update -v`:

```log
...
Opening connection to database 'MyNewDB' on server 'localhost'.
An error occurred using the connection to database 'MyNewDB' on server 'localhost'.
Opening connection to database 'master' on server 'localhost'.
Opened connection to database 'master' on server 'localhost'.
Creating DbCommand for 'ExecuteNonQuery'.
Created DbCommand for 'ExecuteNonQuery' (1ms).
Executing DbCommand [Parameters=[], CommandType='Text', CommandTimeout='60']
CREATE DATABASE [SamuraiAppData];
Executed DbCommand (461ms) [Parameters=[], CommandType='Text', CommandTimeout='60']
...
```
:::

::: tip DbContext initialization
Just like with migration creation, we need to point the EF Tool to the project
that contains `DbContext` creation logic:

```sh
dotnet ef database update -s ../WebAPI/WebAPI.csproj
```
:::

### Tools

The migration tools can be installed as a NuGet package, or as a dotnet CLI tool
(`dotnet tool install --global dotnet-ef`). The CLI tool is invoked with `dotnet
ef`.

Additionally, we'd need to install the `Microsoft.EntityFrameworkCore.Design`
NuGet package to access the Migration APIs from code.

## Scaffolding

The "Code First" approach is recommended, but it is also possible to kind of
reverse engineer a DB into models. The EF Tool has the `scaffold` subcommand for
such a usecase.

## Relations

### One-to-Many

If an entity contains a collection of another entity, EF Core treats it as a
one-to-many relationship. 

The child entity can optionally have a property of a type of a parent - it
will be a reference. The child may also have an ID property that would be a
Foreign Key to the parent. EF Core will initialize these properties for us.

```csharpharp
public class Quote
{
    public int Id { get; set; }
    public string Text { get; set; }

    // optional
    public Samurai Samurai { get; set; } // Navigation Property (reference to parent)
    public int SamuraiId { get; set; } // FK - it helps EF Core to know that Quote is  a "child"
}
```

::: tip Naming
Names of the optional properties should follow conventions to be recognized by
EF Core. We could also configure our own conventions.
:::

### Many-to-Many

To create many-to-many, we just need two entities referring to each other via
collections:

```csharpharp{5,12}
public class Samurai
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Battle> Battles { get; set; } = new List<Battle>();
}

public class Battle
{
    public int BattleId { get; set; }
    public string Name { get; set; }
    public List<Samurai> Samurais { get; set; } = new List<Samurai>();
}
```

EF Core has a convention that understands it and it will create three tables:

- Samurais
- Battles
- BattleSamurai - association of BattleIds with SamuraiIds (the PK will be a
  combination of these two FKs)

It's called **Skip Navigation**, because in code we can forget about the
intermediary table and just work with the two entities being related.

::: tip Join class name
The join class (e.g., BattleSamurai) was named by following EF Core's
convention: class names are placed alphabetically. That's why it's
"BattleSamurai" and not "SamuraiBattle".
:::

#### Join Class

For simplest cases, the above is enough. For some more advanced scenarios, we
need to create additional class that joins our entities together.

::: tip EF Core < 5.0
In older versions of EF Core, it was mandatory to create such a class for every
many-to-many relationship.
:::

Here's an example of a class joining two entites (with some metadata):

```csharpharp
public class BattleSamurai
{
    public int SamuraiId { get; set; }
    public int BattleId { get; set; }
    public DateTime DateJoined { get; set; }
}
```

This class represents the connection between a Samurai and a Battle. It's
similar to the SQL table that EF Core creates behind the sceness. We've added a
`DateJoined` parameter as some metadata about the connection (often called
"Payload").

Additionally, we have to update the `DbContext` to explicitly specify the
relationship:

```csharpharp
public class SamuraiContext : DbContext
{
    public DbSet<Samurai> Samurais { get; set; }
    public DbSet<Battle> Battles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Samurai>()
            // Many-to-many
            .HasMany(s => s.Battles)
            .WithMany(b => b.Samurais)
            // Use the class we've created (BattleSamurai)
            .UsingEntity<BattleSamurai>(
                bs => bs.HasOne<Battle>().WithMany(),
                bs => bs.HasOne<Samurai>().WithMany())
            // Configure default value for DateJoined
            .Property(bs => bs.DateJoined)
            .HasDefaultValueSql("getdate()");
    }
}
```

For the simplest cases we wouldn't have to do such configuration.

### One-to-One

By default, the "principal" does not have to have any "dependant", while the
"dependant" has to have a "principal".

In the DB, the "dependant" will have FK to the "principal". The "principal" will
not have FK to the "dependant".

Example:

```csharpharp
// Principal
public class Samurai
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Horse Horse { get; set; } // Naigation Property to the Dependant
}

// Dependant
public class Horse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int SamuraiId { get; set; } // FK to the Principal
}
```

::: tip Single Table
With some configuration, we can make the one-to-one relationship to be stored in
a single table (of the "principal"). By default, two tables are used.
:::

## Queries

EF Core automatically generates `SELECT` queries when accessing objects. We can
also customize the query that EF Core executes on the `DbContext` level.

### Execution Methods

The following methods allow us to query on `DbSet`s:

- `ToList()`
- `First()`
- `FirstOrDefault()`
- `Single()` - expects just one result to be found in the DB, throws otherwise
- `SingleOrDefault()`
- `Last()` - should be preceed by the `OrderBy` call
- `LastOrDefault()` - should be preceed by the `OrderBy` call
- `Count()`
- `LongCount()`
- `Min()`
- `Max()`
- `Average()`
- `Sum()`
- `Find(PK_value)` - not LINQ, it's `DbSet`'s method that looks for a row with a
  specified key

::: tip Async
All these methods also have the async counterparts.
:::

### Parametrizing

When invoking queries on the DB, the parameters that we provide may be
parametrized or not. If we use a variable to provide some parameter, SQL will be
parametrized. If we provide a hardcoded string, it will not be parametrized.

```csharpharp
// Parametrized
var name = "Sampson";
var samurais = _context.Samurais.Where(s => s.Name == name).ToList();

// Not parametrized
var samurais = _context.Samurais.Where(s => s.Name == "Sampson").ToList();
```

### Related Data

By default, when pulling some entities, their related entities are not fetched.
E.g., if I have a 1-to-Many relationship between samurais and quotes, if I query
for the samurai, the list of quotes will be empty.

#### Eager Loading

With Eager Loading and its `Include` method, we can specify Navigation
Properties that should be populated with the query:

```csharpharp
var samuraiWithQuotes = _context.Samurais
    .Include(s => s.Quotes).ToList();
```

::: tip
The resulting query will make use of `OUTER JOIN` to get data from both the
"Samurais" and "Quotes" tables. There's an option to send separate queries as
well (`AsSplitQuery()`).
:::

##### Filtered Query

When including some child, we can filter it as well:

```csharpharp
var samuraiWithQuotes = _context.Samurais
    .Include(s => s.Quotes.Where(q => q.Text.Contains("abc")))
    .ToList();
```

##### Other Variations

Here are some other sceanarios for Eager Loading:

- Include children and grandchildren:

    ```csharpharp
    context.Samurais
        .Include(s => s.Quotes) // many-to-many
        .ThenInclude(q => q.Translations); // one-to-many
    ```

- Include just grandchildren:

    ```csharpharp
    context.Samurais
        .Include(s => s.Quotes.Translations);
    ```

- Include different children:

    ```csharpharp
    context.Samurais
        .Include(s => s.Quotes)
        .Include(s => s.Clan);
    ```

#### Explicit Loading

Explicit Loading allows to load related data when the "base" entity is already
loaded:

```csharpharp
var samurai = context.Samurais.Find(13);
context.Entry(samurai).Collection(s => s.Quotes).Load(); // one-to-many
context.Entry(samurai).Reference(s => s.Horse).Load(); //one-to-one
```

#### Lazy Loading

Lazy Loading fetches the data from the DB as soon as we try to access some
related data via a Navigation Property.

::: tip OFF
Lazy Loading is disabled by default due to its performance overhead.
:::

### Limiting Properties

We can limit the properties to be returned with `Select`:

```csharpharp
var someProps = context.Samurais.Select(s => new { s.Id, s.Name }).ToList();
```

In this case a list of anoymous objects will be returned, but we could use some
known type as well.

::: tip Related Data 
We can use `Select` to bring in related data as well and use it instead of
[Eager Loading](#eager-loading). 
:::

An interesting usecase of that is to bring in just the count of some related data:

```csharpharp
var someProps = context.Samurais
    .Select(s =>
        new { s.Id, s.Name, QuotesCount = s.Quotes.Count })
    .ToList();
```

::: warning Tracking
When projecting entities to custom/anonymous types, EF Core's `DbContext` is not
able to track the pulled entities.
:::

### LIKE

We can use SQL's `LIKE` with the `EF.Functions.Like` function:

```csharpharp
var samurais = _context.Samurais.Where(s => EF.Functions.Like(s.Name, "J%")).ToList();
```

## Removing Data

Here's how to remove some entity

```csharpharp
var samurai = _context.Samurais.Find(4);
_context.Samurais.Remove(samurai);
_context.SaveChanges();
```

### Many-to-Many

Here's how to remove a Many-to-Many relationship:

```csharpharp
var battle = _context.Battles.Include(n => n.Samurais).FirstOrDefault();
battle.Samurais.RemoveAll(s => true); // remove all samurais from a battle
// battle.Samurais.Remove(battle.Samurais.First()); // remove a single samurai from a battle
_context.SaveChanges();
```

The `Include` above is crucial. If we fetched battles without samurais,
`DbContext` would not "know" that any samurais were in the battle, and the
`Remove` call would not have any result.

In case when we're using a more explicit Many-to-Many relationship, with a Join
table class defined, we can remove an association as follows:

```csharpharp
var bs = _context.Set<BattleSamurai>()
    .SingleOrDefault(bs => bs.BattleId == 1 && bs.SamuraiId == 10);
if (bs is not null)
{
    _context.Remove(b_s);
    _context.SaveChanges();
}
```

::: tip Modifying payload
If we want to modify some payload data of a many-to-many relationship, we'd have
to modify the join class object, similarly to the code above.
:::

## Adding Rows

We can add new rows:

```csharpharp
context.Samurais.Add(newSamurai);

// or
context.Add(newSamurai);
```

## Updates

We can update the entities as follows:

```csharpharp
var samurai = _context.Samurais.FirstOrDefault();
samurai.Name += "San";
_context.SaveChanges();
```

Since the same `DbContext` instance was used to retrieve the object and to
update it, EF Core knows which properties have been updated. The SQL sent to the
DB will contain only the modified values.

In disconnected scenarios, the case is that we have to update some entity
without retrieving it first (e.g., in some Web API). Then, we can do that as
follows:

```csharpharp{4}
// 'data' could be delivered in the body of a PUT request

using var context = new SamuraiContext();
context.Update(data);
context.SaveChanges();
```

In such a case, since the context is fresh and does not "know" which properties
have been changed, the SQL sent to the DB will contain all the properties of the
entity to be updated.

### Attach

When using `Update` in the disconnected scenarios with related data, EF Core is
going to send unneeded requests to the DB. Here's an example:

```csharpharp
var samurai = _context.Samurais.Find(samuraiId);
samurai.Quotes.Add(
    new Quote
    {
        Text = "Some quote"
    });

// Disconnected
using (var newContext = new SamuraiContext())
{
    newContext.Samurais.Update(samurai);
    newContext.SaveChanges();
}
```

In this case, not only a new quote will be created, but also samurai's
properties will be updated (all of them). The `newContext` is fresh, it did not
track anything, and it doesn't "know" what exactly has changed. To make sure
that DB is in proper state it will send to it everything.

We can use `Attach` to circumvent that.

```csharpharp{4}
// Disconnected
using (var newContext = new SamuraiContext())
{
    newContext.Samurais.Attach(samurai);
    newContext.SaveChanges();
}
```

When using `Attach` the `DbContext` (`newContext` in this case) will not treat
the provided data as "Modified". Instead, it will treat it as "Unchanged".
However, EF Core sees that one of the quotes in the samurai does not have a
value for the `Id` (PK), and for the `SamuraiId` (FK). It will understand that
this data needs to be sent to the DB.

Another approach would be to add the `Quote` to the DB directly, instead of
doing that via a samurai. For this to work, we need to have a FK property of
`Quote`:

```csharpharp
var quote = new Quote { Text = "Some text", SamuraiId = samuraiId };
using var newContext = new SamuraiContext();
newContext.Quotes.Add(quote);
newContext.SaveChanges();
```

### Updating Related Entity

A similar issue that we had with a single entity when updating it in a
Disconnected scenario occurs if we want to update some entity with relations:

```csharpharp{10}
var quote = context.Samurais
    .Include(s => s.Quotes)
    .First(s => s.Id == 2)
    .Quotes
    .First();

quote.Text += "Some update";

// Disconnected
using var newContext = new SamuraiContext();
newContext.Quotes.Update(quote);
newContext.SaveChanges();
```

The `Update()` call here might be very "heavy". It will not only update the
quote, but also the samurai, and all the other quotes that it has! A fresh
`DbContext` instance does not know what the previous state was, so it will try
to update everything.

Replacing `Update` with `Attach` method will not help in this case, because it
will just mark all entities as "Unmodified" and EF Core will not issue any
updates at all. The modified quote already has `Id` and `SamuraiId`, so the
previous solution doesn't work. We should use the following approach:

```csharpharp
newContext.Entry(quote).State = EntityState.Modified;
newContext.SaveChanges();
```

We're manually informing EF Core that this quote was modified. Only this one
entity will be updated, related data is left unchanged - just one `UPDATE`
command will be sent to the DB.

## Keyless Entities

EF Core 3.0 introduced the possibility to have entities without PK.
Here's how we can use it:

Create an entity:

```csharpharp
public class SamuraiBattleStat
{
    public string Name { get; set; }
    public int? NumberOfBattles { get; set; }
    public string EarliestBattle { get; set; }
}
```

Add a `DbSet` to the `DbContext`:

```csharpharp
public DbSet<SamuraiBattleStat> SamuraiBattleStats { get; set; }
```

Configure the entity to be keyless in `OnModelCreating` of the `DbContext`:

```csharpharp
modelBuilder.Entity<SamuraiBattleStat>().HasNoKey();
```

::: tip Tracking
Keyless entities are not tracked by `DbContext` and it cannot be enabled.
:::

::: warning Find() Method
Even though a keyless entity may be a `DbSet` we cannot use `DbSet`'s `Find()`
method on it - there's no key after all! The code will compile just fine, but an
exception will be thrown in the runtime.
:::

### Views

In case the `SamuraiBattleStat` is supposed to be a View in the DB, we need
to configure it as follows:

```csharpharp
modelBuilder.Entity<SamuraiBattleStat>().HasNoKey().ToView("SamuraiBattleStats");
```

Without that, EF Core would create a new table.

::: warning Creating Views
EF Core cannot create Views. They need to be created externally (e.g., with some
migration executing raw SQL). Even the migration generated after the above
change will be empty!
:::

## Raw SQL

In special cases, we can use raw SQL in EF Core. It might be more performant
than relying on EF Core's queries. 

### Migrations

For example, we might want to have a View or a Stored Procedure in our DB. To
create that, we'd create an empty migration and add SQL to that migration.
Here's an example:

```csharpharp
public partial class AddStoredProcedures : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(
        @"CREATE PROCEDURE dbo.DeleteQuotesForSamurai
            @samuraiId int
            AS
            DELETE FROM Quotes
            WHERE Quotes.SamuraiId=@samuraiId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // Remove
    }
}
```

### Querying

Here's an example of how we can invoke raw SQL with a `DbContext`:

```csharpharp
var samurais = context.Samurais.FromSqlRaw("SELECT * FROM Samurais").ToList();
```

Since we used a `DbSet`, the result will be mapped to the entity of that
`DbSet`. The entities will be tracked as well.

::: warning Mapping
There are some rules that we need to follow for the mapping to succeed:

- The result must contain ALL the properties of the entity - not more, not less.
- The result cannot contain related data - we can go around it by attaching
`Include()` after the `FromSqlRaw()`.
:::

::: tip Parametrized Strings
We can use interpolation (e.g., `SELECT * FROM {tableName}`). Doing that is
safer with `FromSqlInterpolated()`. The SQL query will be parametrized.
:::

### Stored Procedures

```csharpharp
var samurais = _context.Samurais.FromSqlInterpolated(
    $"EXEC dbo.HomesWithNRooms {rooms}").ToList();
```

### Other Requests

There is also another way to invoke SQL commands:

```csharpharp
context.Database.ExecutrSqlRaw("some SQL");
```

As a response we'll get just a number of rows affected by the command. We could
use it to execute some stored procedure that does not return data.

## Logging

We can configure logging in multiple ways.

### Tagging

Every interaction with the `DbContext` may be tagged with a comment that will be
visible on the SQL Server side.

```csharpharp
var data = _context.Samurais.TagWith("Some comment").ToList();
```

### LogTo

A `DbContext` class may be configured with a `LogTo` call:

```csharpharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.LogTo(Console.WriteLine);
}
```

We'll see logs generated by EF Core in the console.

By default, all values are hidden, since they might be sensitive. We can disable
that hiding with:

```csharpharp
optionsBuilder.LogTo(Console.WriteLine)
    .EnableSensitiveDataLogging();
```

### Generic Host

For apps using the Logging infrastructure, we don't have to do anything, logs
will already be there.

## Batching

If at least 4 operations have been added to the `DbContext`, EF Core will
execute a batch request instead of sending these operations/requests separately.