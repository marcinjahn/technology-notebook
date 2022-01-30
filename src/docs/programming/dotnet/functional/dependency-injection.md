---
title: Dependency Injection
description: Dependency Injection in Functional Programs
lang: en-US
tags: .net, asp.net, c#, functional programming
---

# Dependency Injection

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

::: tip Records
We could make the code even shorter with a record.

```csharp
public record DateValidator(Clock Clock)
{
    public bool Validate(Order order) =>
        order.Time <= Clock();
}
```
:::

::: tip Delegate
Usage of a new delegate type was not necessary. We could just use
`Func<DateTime>`. A `Clock` type makes it a bit more readable.
:::