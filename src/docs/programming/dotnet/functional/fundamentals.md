---
title: Fundamentals of FP
description: Fundamentals of Functional Programming, like Higer-Order Functions (HOF), or purity, in C#
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

