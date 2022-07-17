---
title: Enumerables
description: How enumerables work in .NET
tags: .net, IEnumerable, IEnumerator, IAsyncEnumerable, enumerator, linq, yield
lang: en-US
---

# Enumerables in .NET

## IEnumerable and IEnumerator

Collections in .NET implement `IEnumerable`. This interface has just one method:
`GetEnumerator()`. It returns an implementation of `IEnumerator()`.

::: tip Generics
Normally, we don't use non-generic `IEnurable`/`IEnumerator` nowadays, but I'll
be using these shorter interface names here for simplicity.
:::

`IEnumerator` allows to
([MSDN](https://docs.microsoft.com/en-us/dotnet/api/system.collections.ienumerator?view=net-6.0)):

- move between elements in the collection
- read the current element
- reset state

Why do we even need `IEnumerable` and don't just implement `IEnumerator` in
every collection type? That's because we want to be able to enumerate a single
collection by multiple actors. `IEnumerator` has a state. We can't use the same
instance of it from two different services, because none of these services would
get a full picture of the collection. Instead, each service should retrieve its
own copy of `IEnumerator` (via `IEnumerable`) and use it.

::: tip Length
An important characteristic of the `IEnumerable` is that its length is unknown.
This is quite useful in scenarios where the data source is huge and counting its
length would be a huge overhead.

The source of data could be actually infinite, for example it could be a source
of random numbers. In such a case, the `IEnumerator` implementation would
probably not need to keep the reference to its source `IEnumerable`, as it
usually happens with typical collections, like the `Array`. You will find a
similar example below.
:::

### Examples

#### Array

An example of an `IEnumerable` is an `Array`.
[Here](https://github.com/microsoft/referencesource/blob/master/mscorlib/system/array.cs#L1268)
we can see that it implements `IEnumerable.GetEnumerator()`. The enumerator
itself can be found
[here](https://github.com/microsoft/referencesource/blob/5697c29004a34d80acdaf5742d7e699022c64ecd/mscorlib/system/array.cs#L2597).
It keeps reference to the `Array`. One of its components is the `Current`
property. All it does is it returns the element at the current `_index`. The
[MoveNext()](https://github.com/microsoft/referencesource/blob/5697c29004a34d80acdaf5742d7e699022c64ecd/mscorlib/system/array.cs#L2665)
is also there. It basically increments the `_index`.

#### Infinite Enumerator

This is a simple enumartor that just returns consecutive numbers, forever (well,
until it overflows):

```cs
public class InfiniteEnumerable : IEnumerable
{
    public IEnumerator GetEnumerator() => new InfiniteEnumerator();
}

public class InfiniteEnumerator : IEnumerator
{
    private int _current = 0;
    public object Current {get; private set;} => _current;

    public bool MoveNext()
    {
        _current++;
    }
}
```

Here's how we'd use it:

```cs
foreach (var value in new InfiniteEnumerable())
{
    Consol.WriteLine(value);
}
```

It would just print numbers forever.

### foreach

`foreach` keyword is basically a syntax sugar that relies on the `IEnumerable`
and `IEnumerator`:

Syntax sugar:

```cs
foreach (var element in collection)
{
    Console.WriteLine(element);
}
```

Behind the scenes:

```cs
var enumerator = collection.GetEnumerator();
while(enumerator.MoveNext())
{
    Console.WriteLine(enumerator.Current);
}
```

::: warning Simplification!
In reality the generated code is more convoluted, for example it calls
`Dispose()` in the `finally` block.
:::

### yield

The `yield` keyword is a shortcut that allows us to create our own
`IEnumerable`/`IEnumerator`s. For example, to create an infinite enumerator, we
don't have to create new implementations of `IEnumerable` and `IEnumerator`. All
we have to do is this:

```cs
public IEnumerable<int> GetNumbersForEver()
{
    var i = 0;
    while(true)
    {
        yield return i++;
    }
}
```

It's a method that uses the `yield` keyword. It works in a way that each time we
ask for the next value from the returned `IEnumerable`, it is going to execute
the loop iteration, until it finds the next `yield`. In our case, there's just 1
line of code in the loop, but there could be more.

So, basically, `yield` creates a custom `IEnumerator` (behind the scenes) that
returns values only when we ask for them. The code in the method using `yield`
runs ONLY when we ask for the next element.

It is very similar to how LINQ works.

## IQueryable

The `IQueryable` interface is a bit similar to `IEnumerable`. In fact, it
inherits from `IEnumerable`. `IQueryable` is mostly used with LINQ and data
providers. The advantage of it is that is allows to construct a query before
executing it against a data source (e.g., a database). `IQueryable` has a
property called `Expression`. This is the expression tree that a given instance
of `IQueryable` represents. For example (using Entity Framework):

```cs
var people = context.People.Where(p => p.Name.StartsWith("B"));
```

This is turned into an expression tree, stored in the `IQueryable.Expression`.

Let's say I add another line of code to what I had:

```cs
var threePeople = people.Take(3);
```

If we were using `IEnumerable`, we'd request all the people from the database
first, and then (locally) extract three entities from that. It's obviously
inefficient. However, thanks to the use of `IQueryable`, when the `Take(3)` was
added, the expression tree got modified and the constructed SQL query could make
use of something like `TOP` to deliver just 3 people instances.

## References

- [IEnumerable (MSDN)](https://docs.microsoft.com/en-us/dotnet/api/system.collections.ienumerable?view=net-6.0)
- [IEnumerator (MSDN)](https://docs.microsoft.com/en-us/dotnet/api/system.collections.ienumerator?view=net-6.0)
- [YouTube (IEnumerable)](https://www.youtube.com/watch?v=UfT-st9dl8Q)
- [Iterator Block Implementation](https://csharpindepth.com/Articles/IteratorBlockImplementation)