---
title: Fundamentals of FP
description: Fundamentals of Functional Programming, like Higher-Order Functions (HOF), or purity, in C#
tags: .net, asp.net, c#
lang: en-US
---

# Fundamentals of FP

One of the most significant issues in programming nowadays is how to deal with
the increasing complexity of the software. Functional Programming is a way to
simplify programs.

In FP (opposed to OOP), separating functions from data is natural. Functions
encode logic, and data represent inputs and outputs of functions.


## Higher-Order Functions

These are functions that either:

- accept other functions as inputs
- return functions as outputs
- both of the above

## Purity

In mathematics, functions don't have side effects. Based on some inputs, some
output is returned. In programming, that's not always the case. Programs change
state.

Functions might be **pure** or **impure**. Pure functions are similar to the
mathematical functions. They do not rely on or modify any state. Their outputs
depend solely on the inputs.

::: tip Impurity will always be there
Some of the code has to be impure. Otherwise, the program wouldn't be able to
communicate the result to the outside world (communicating outside world implies
impurity).
:::

Impure functions can modify (or just read) an external state, and their outputs
can depend on some external state as well. They are much harder to reason about,
test and they might now work as expected in concurrent scenarios.

::: tip Impurity cases
If a function modifies its inputs (and the modification is visible
outside of the function), it's an impure function.

If a function may throw exceptions, it's impure. The outcome might change
depending on having a try-catch or not. (so what?)

If the function does any I/O operations (even writing to the console), it's
impure. The result might differ depending on the availability and state of 
the external I/O resource.
:::

Pure functions ALWAYS return the same output for the same input. Functional
programs may be optimized with:

- parallelization - different threads can run functions, and no conflicts will
  appear.
- lazy evaluation - only evaluates outputs when needed
- memoization - caching of results for performance gains

These techniques are not straightforward with impure functions.

::: tip Static Methods
Pure functions should be implemented as static methods.
:::

## Functors

When a value is wrapped in some container (like an `Option` or `IEnumerable`) we
can't apply functions to it:

```csharp
Increment(Some(3)) //doesn't work
```

This is where `Map` comes in. It allows us to extract the value from a container
and apply a function to it. It returns a functor a well.

```csharp
Some(3).Map(Increment); //Some(4)
```

A type for which a `Map` function (`Select` in C#) is defined is called a
**functor**. Functors include:

- collections (or in general `IEnumerable`)
- `Option`

Functors have some inner values to which a function can be applied.
A map can be represented as follows:

`(C<T>, (T -> R)) -> C<R>`

`C<T>` is a functor.

::: tip Functions
Functions are functors as well!
:::

### Map vs ForEach

`Map` is to be used with functions that have no side-effects, while `ForEach` is
to be used with side-effect function. Example:

```csharp
var names = new string[] {"Andy", "John", "Jules"};
names
  .Map(n => $"Hello {n}") // pure function
  .ForEach(WriteLine);    // impure function
```

`Map` takes a `Func`, while `ForEach` takes an `Action`.

## Monads

### Bind

A `Bind` function (`SelectMany` in C#) is useful to flatten lists of lists.

`Bind` can be represented as follows:

`(C<T>, (T -> C<R>)) -> C<R>`

A type that has a `Bind` method is a **monad**.

Example:

```csharp
record Pet(string Name);
record Person(string Name, IEnumerable<Pet> Pets);

var people = new[] {
  new Person("George", new Lit<Pet>{ new Pet("dog"), new Pet("cat") }),
  new Person("Peter", new Lit<Pet>{ new Pet("hamster") }),
  new Person("Jady", new Lit<Pet>{ }),
}

var animals = people.Bind(p => p.Pets); // ["dog", "cat", "hamster"]
```

A `Map` would return a list of lists. `Bind` is much more suitable here.
The `Person[]` type is a monad.

### Return

A monad must also have a `Return` function defined. It's a function that wraps a
"normal" value `T` into a monadic value `C<T>`.

`Return` can be represented as follows:

`T -> C<T>`

An example of a `Return` function could be a function that turns items into a
list, or a `Some` method of `Option`.

::: tip
`IEnumerable` and `Option` are both **functors** and **monads**.

Every monad is also a functor.
Not every functor is a monad.
:::

## References

- [https://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html](https://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)
- [http://learnyouahaskell.com/chapters](http://learnyouahaskell.com/chapters)