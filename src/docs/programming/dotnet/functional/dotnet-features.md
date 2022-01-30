---
title: .NET Functional Features
description: Functional Programming in C# - features
tags: .net, asp.net, c#
lang: en-US
---

# Functional Features of C#

C# is a multi-paradigm language. It allows writing code in a functional style.

## Records

Records allow easily to define immutable structures, which is something
very important in pure functional languages.

::: tip Records
More on records [here](/programming/dotnet/records.md)
:::

## Functions within functions

There are two ways to create a function within another function:

- lambdas
- function definitions (since C# 7)
  
  ```csharp
  void F1()
  {
    double Square(double a) => Math.Pow(a, 2);
  }
  ```

Both these ways result in separate classes being created by the compiler.

::: tip Performance
Local functions might mitigate some performance hit if they're not using any data
from the scope where they're defined, with the `static` keyword.

```csharp
static double Square(double a) => Math.Pow(a, 2);
```

Using some variable from outside of the local function results in a compilation
error.
:::

## Tuples

Tuples are useful since in functional programs there may be lots of small functions
returning its own data. It would clutter the codebase to define types with return
values of all these functions.

Since C# 7, tuples are much more pleasant to use and more performant. They are treated
as value types, and they are mutable.

Tuple's items can be named:

Example:

```csharp
public static (string Base, string Quote) AsPair(ths string ccyPair) =>
    ccyPair.SplitAt(3);

var pair = "EURPLN".AsPair();
WriteLine($"{pair.Base} - {pair.Quote}");
```

## Switch Statement

Since the C# 8, `switch` works similarly to Rust's `switch` thanks to pattern
matching.

```csharp
record Address(string Country);

address switch
{
    ("cz") _ => DoSomethingCzechSpecific(),
    (var country) _ => DoSomethingForOtherCountries()
}
```

::: tip
Property mathching might be useful if the `address` container more properties:

```csharp
address switch
{
    { Country: "cz" } => DoSomethingCzechSpecific(),
    { Country: var c } => DoSomethingForOtherCountries()
}
```
:::

## Delegates

Custom-defined delegates are rarely used nowadays thanks to the generic `Func`
and `Action`. These can be even used when "classic" delegates are expected.