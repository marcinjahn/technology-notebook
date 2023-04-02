---
title: Modularity
description: Dependency Injection in Functional Programs
lang: en-US
tags: [".net", "asp.net", "c#", functional programming]
---

# Modularity

## Dependency Injection

In a typical C# program, we'd have something like this:

```csharp
public interface ITimeProvider
{
    DateTime GetTime();
}

public class DefaultTimeProvider : ITimeProvider
{
    public DateTime GetTime() =>
        DateTime.UtcNow;
}

public class DateValidator
{
    private readonly ITimeProvider _timeProvider;

    public DateValidator(ITimeProvider timeProvider)
    {
        _timeProvider = timeProvider;
    }

    public bool Validate(Order order) =>
        order.Time <= _timeProvider.GetTime();
}

// DI
services.AddSingleton<ITimeProvider, DefaultTimeProvider>();
services.AddSingleton<DateValidator>();
```

We need to contact the "outside world" to get the time. In order to make the
code testable, the time-getting functionality was extracted to an external
class. There's also an interface that makes it easy to create a mock and inject
it. We end up with lots of interfaces with just one implementation - that's
not the purpose of interfaces. It brings much boiler-plate code.

We could use function-injection to achieve the same behavior:

```csharp
public delegate DateTime Clock();

public class DateValidator
{
    private readonly Clock _clock;

    public DateValidator(Clock clock)
    {
        _clock = clock;
    }

    public bool Validate(Order order) =>
        order.Time <= _clock();
}

// DI
services.AddSingleton<Clock>(_ => () => DateTime.UtcNow);
services.AddSingleton<DateValidator>();
```

:::tip[Records]
We could make the code even shorter with a record.

```csharp
public record DateValidator(Clock Clock)
{
    public bool Validate(Order order) =>
        order.Time <= Clock();
}
```
:::

:::tip[Delegate]
Usage of a new delegate type was not necessary. We could just use
`Func<DateTime>`. A `Clock` type makes it a bit more readable.
:::

The presented example is still a bit semi-functional. Ideally, we should
transform the `DateValidator` class into a function.

## Modularity in FP

In OOP, we use interfaces and their implementations that are injected whenever
an interface is required.

In FP, we don't use interfaces. The function's signature is the interface
itself. Additionally, instead of creating classes that contain some logic, FP
promotes the idea of creating functions with that logic. Then, if some other
component requires that logic, a delegate should be used to inform about that
(instead of an interface).

Here's a practical example:

OOP:

```csharp
public class MakeTransferController : ControllerBase
{
    IValidator<MakeRequest> _validator;
    TransferHandler _handler;

    [HttpPost, Route("api/transfers/book")]
    public IActionResult MakeTransfer([FromBody] MakeTransfer cmd) =>
        _validator.Validate(cmd).Map(_handler.Save).Match(
            Invalid => BadRequest,
            Valid => Ok()
        )
}

// + some typical IoC dependencies registration
```

FP:

```csharp
public delegate Validation<T> Validator(T t);

// Returns handler
static Func<MakeRequest, IResult> HandleSaveTransfer(
    Validator<MakeTransfer> validate,
    Func<MakeRequest, Exceptional<Unit>> save) =>
        transfer =>
        validate(transfer).Map(save).Match(
            Invalid => BadRequest,
            Valid => Ok()
        )

// Invoked during bootstrap
static Func<MakeRequest, IResult> ConfgureSaveTransferHandler(IConfiguration config)
{
    var connString = config.GetSection("ConnectionString").Value;

    var save = connString.CreateInserter("INSERT ..."); // some factory function
    var validate = DateNotPast(); // some factory function
    return HandleSaveTransfer(validate, save);
}
```

```csharp
var app = WebApplication.Create();
var handleSaveTransfer(ConfgureSaveTransferHandler(app.Configuration));

app.MapPost("/api/transfers/book", handleSaveTransfer);

await app.RunAsync();
```

Dependecies are not stored in any fields, they are passed as parameters to the
function.

:::tip[Partial Application]
The code above is an example of [Partial Application](./partial-application.md).
In order to save the transfer, three parameters are required:
- validator
- saver
- request details

We Have a HOF that accepts the first two parameters to create a function which
only needs the last remaining parameter.
:::

:::caution[.NET 6]
The last code block uses .NET 6's Minimal APIs feature that enables functional
approach. Older SDKs may use the [Feather HTTP
framework](https://github.com/featherhttp/framework).
:::

The functional approach still has decoupled components (functions). Testing
should become a bit easier, creating mock functions is easier than creating mock
objects.