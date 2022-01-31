---
title: Signatures
description: Functional Programming in C# - Signatures
tags: .net, asp.net, c#
lang: en-US
---

# Signatures

Functional programming mainly deals with functions. Function signatures are
denoted as follows in the FP community:

`f: int -> string`

In this case, we have a function called `f` that takes an `int` as an input and
returns a `string`.

More examples:

- `int -> ()` - returns `void`
- `(int, string) -> int` - takes two parameters
- `(string, (IConnection -> T)) -> T` - one of the parameters is a function that
  takes `IConnection` and returns `T`.

::: tip
Signatures of functions (name + parameters + return type) are very important,
they should be as expressive as possible.
:::

Functions that return `void` or `Task` (or "unit") are side-effect functions.
They do something with the "outside world".

## Custom Types

It is OK to specify new types for specific purposes, like using `Age` instead of
`int` (it also adds to the expressiveness of the signature).

### Honesty

A function is considered *honest* if it truly specifies its work in te
signature. The function `Risk CalculateRisk(int age)` is *dishonest*, because it
will most likely fail if negative age is provided. However, its signature states
that any `int` is OK.

The function `Risk CalculateRisk(Age age)` is *honest*, because it clearly says
that it maps `Age -> Risk`. Assuming that the `Age` type has proper validation
and cannot be invalid, the function will work with any value of `Age`.

## Unit type

The absence of data can be represented with `Unit` instead of `void`. It's
similar to [Rust's `()` type](programming/rust/basics.md).

A problem with `void` is that it makes it impossible to treat functions that do
return data similarly as those that don't. If ther is some HOF like this one `T
ExeuteAndLog(Func<T> func)` we will not be able to invoke it with a `func` that
is an  `Action`. We'd have to create an overload that accepts `Action`. It's
duplication and it sucks.

.NET provides its own "Unit" type - `System.ValueTuple` (which makes it even
more similar to Rust, since an empty tuple would look like this - `()`).

```csharp
ValueTuple DoSomething()
{
  // ...
  return default; // an empty tuple
}
```

::: tip Aliasing
`using Unit = System.ValueType;` allows for `Unit` name to be used.
:::

## Option

In FP we never use `null`. Instead, `Option<T>` is used. It makes signatures
[honest](./signatures.md#honesty).

`Option<T>` is a union of `Some(T)` and `None`.

.NET does not have a standard `Option<T>` type. Here's a simple implementation:

```csharp
interface IOption<T> {}
record None<T> : Option<T>; // None shouldn't need a T, but the compiler requires it
record Some<T>(T value) : Option<T>;
```

::: warning Maybe
Sometimes the "Option" concept is referred to as "Maybe".
:::

Option pattern is useful for functions that are *Partial*. Such functions are
able to return valid data only for some subset of their domain. It's often not
clear what a function should do if input is outside of that subset - throw an
exception? Return `null`? Returning `None` is a better way. An example of such a
function could be a function that parses a `string` into an `int`. Not every
string is a valid integer.

::: tip Implicit Type Conversions
C# has a feature that allows one type to be converted to another implicitly. If
a given `Option` implementation uses that, it allows `null` to be treated as
`None` and `"data"` as `Option<string>`.
:::

Constructors can also return `Option<T>` in case when an object might need some 
validation of inputs before creation.

### Nullable references in C# 8

C# 8 brought a way to specify if a reference value can be nullable. It's a bit
similar to the `Option<T>`, however, it has major drawbacks, the biggest of them
being the fact that it's opt-in and can be entirely skipped. However, it still
makes sense to enable it since it gives good warnings when `null` might be
encountered.

### Using Option

Rust-like `Match` function can be implemented for consuming `Option<T>`.

Additionally, it's useful to have a `Map` (C#'s `Select`) function on `Option<T>`. That way, we can do the following:

```csharp
var someOption = FnThatReturnsOption();
someOption.Map(CalculateData);
```

Without option, we'd do:

```csharp
var someValue = FnThatReturnsValue();
if (someValue is not null) {
  CalculateData(someValue);
}
```

::: tip
`Option` can be seen as a specialized container and treated like an
`IEnumerable`. That way we can use the `Map` (and `ForEach`) patterns with them
the same way.

[More about `Map` and
`ForEach`](/programming/dotnet/functional/fundamentals.md#map-vs-foreach)
:::