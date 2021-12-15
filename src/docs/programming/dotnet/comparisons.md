---
title: Comparisons
description: How comparisons work in .NET
tags: .net
lang: en-US
---

# Comparisons

Comparisons work out-of-box only for primitive types. For others they need to be
defined.

Comparisons do not work well with inheritance. It's not recommneded to implement
comparisons on unsealed classes.

## `IComparable<T>`

This interface defines `CompareTo` method that returns `int`:
- -1 (less then)
- 0 (equal)
- +1 (greater then)

It's also recommended to implement non-generic `IComparable` for legacy code.

This interface is used by arrays to sort its items - if item does not implement,
exception will be thrown.

## Operators

There are 4 operators that can be implemented: <, <=, >, >=. If these get
implemented, it's recommended to also implement == (and !=).

## `IComparer<T>`

Interface to be implemented by classes that can compare `T`. When implementing
it there's a convention:
- it two objects are `NULL` return "0"
- if first object is `NULL`, return "-1"
- if second object is `NULL`, return "+1"

There is actually a recomendation to inherit from `Comparer<T>` base class
instead of implementing the interface from zero (because it also implements
non-generic `IComparer`, which makes it easier for our class).

Comparers are good candidates for singletons.

A good comparer should be deterministic and the reuslt should not depend on the
input order. For example, if a class has 2 properties and our comparer sorts
them by one of these properties, it might happen that two instances will be
considered equal when their second property has different values. So, our
comparer should actually also look at the value of second property when first
property values are equal.

Writing comparers for non-sealed classes is problematic, mostly due to the
problem outlined in previous paragraph. The result of sorting will depend from
order of input elements since the comparer does not know anything about the
inheriting instances (unles it actually does). There is no real solution for
this issue.

`Comparer<T>.Default` every type can use the default comparer, which uses the
T's `IComparer<T>` implementation (or `IComparer` if generic one is missing).
What if both are missing? Exception?

`StringComparer` is a static class that has 6 variosu comparers for strings
(implements `IComparer` and `IEqualityComparer`).