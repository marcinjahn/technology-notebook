---
title: Equality
description: How equality works in .NET
tags: [".net"]
lang: en-US
---

# Equality

## Good Practices

### Reference Types

- Override `Object`'s virtual `Equals(object o)` method (check for: `null`,
  `ReferenceEquals`, fields/properties). For inherited types, first call
  `base.Equals()` and then check for added properties/fields
- Implement `==` and `!=` - to enable `==` and `!=` (could use the `Object`'s
  static `Equals`, which will call the overridern `Equals`)
- All of the above should give the same results
- Implement `Object.GetHashCode()`

Implementing `IEnumerable<T>` is not recommended since it introduces inheritance
problems (unless the class is `sealed`) and does not give any real benefits
here.

### Value Types

- Implement `IEquatable<T>` - to avoid boxing and have type safety
- Override `Object`'s virtual `Equals(object o)` method - to avoid reflection
  (just call the `IEquatable<T>` version)
- Implement `==` and `!=` - to enable `==` and `!=` (just call the
  `IEquatable<T>` version)
- All of the above should give the same results
- Implement `Object.GetHashCode()`

## Hash Codes

Hash codes are used in HashSets and Dictionaries to be able to retrieve elements
efficiently. If two objects are equal they should have the same hash codes (or
dictionaries might not work)! Therefore `Equals` and `GetHashCode` should rely
on the same set of properties to get the result.

It's recommended to implement hashcodes using XOR operator (`^`):

```
public override int GetHashCode()
{
    return prop1.GetHashCode() ^ prop2.GetHashCode()
}
```

## `Object`'s virtual `Equals(object o)` method

### Classes

In classes it evaluates **reference** equality, unless overriden. `String`,
`tuples` and `delegate` have it overriden.

### Structs

In structs it compares values - all fields are compared (uses reflection). It's
recommended to override `Equals(object o)` by ourselves, because reflection has
very bad performance.

It involves boxing in case of value types, which also is not a good thing. It's
a good practice to always override `GetHashCode` when overriding `Equals`.

## `Object`'s static `Equals(object o1, object o2)` method

This method makes it safe to compare 2 objects if one of them is `NULL`. If they
are not both `NULL`, the virtual `Equals` of `o1` is used (as described above).
So this method gives the same result as virtual one (only it protects from case
where `o1` is `NULL`).

It cannot be overriden (because it's static)

## `Object`'s `ReferenceEquals(Object o)` method

It checks only reference, it cannot be overriden (becasue it's static). Useful
in the case where some type overrides the virtual `Equals`, but also wants to
check for reference equality.

## `IEquatable<T>`

It has the following method: `Equals(T other)` - it is strongly typed, which is
good for value types (no boxing). All numeric primitive types implement it
(`Int`, `byte`, ...), other primitives not always. Some reference types
implement it (i.e. `String`).

If some type implements it, we should make sure that both strong typed `Equals`
and the one from `Object` return the same results.

It is not good for reference types:
- there is no boxing, so no improvement in this area
- doesn't play nicely with inheritance

## `==` operator

It's a feature of C#, not .NET. If overriding `Object`'s `Equals`, `==` also
should be overriden. `==` does not use `Equals` - it uses `eqc` IL procedure
directly, which (?) uses hardware (unless overriden).

`Tuple` does not override `==`, but overrides `Object.Equals()` - because of
that operator only checks reference equality and can return different result
than `Object.Equals()` - bad practice!

Implementing `==` requires implementing also `!=` (by compiler).

### Inheritance

`==` does not work well with inheritance - if we cast `MyClass` to `Object` and
compare, it will use `Object`'s `==` implementation (reference equality).
`Equals` methods don't have this issue.

### Generics

With generics, `==` ALWAYS compares references (even if `T` implements the
operator). `Object.Equals()` should be used here!

### Struct

For value types it has to be overloaded before using it.

### Classes
For classes it compares the references (memory addresses), unless overriden.

### Overloading

```csharp
public static bool operator ==(MyClass left, MyClass right) 
{
    // Equality logic
}

public static bool operator !=(MyClass left, MyClass right) 
{
    // Inequality logic
}
```

The logic should be the same as in `Object.Equals()`!

## `IEqualityComparer<T>`

Requires `Equals` and `GetHashCode` to be implemented. It's adviced to inherit
from `EqualityComparer<T>` base class (similar as with `Comparer<T>`).

EqualityComparer is adviced to be a singleton.

It's problematic to deal with derived types - as exmplained in my notes on
comparers.

`EqualityComparer<T>.Default` - every type can use the default comparer, which
uses the `T`'s equality implementation.

`StringComparer` is a static class that has 6 variosu comparers for strings
(implements `IComparer` and `IEqualityComparer`).

## `IStructuralEquatable`

Collections are structurally equal if:
- they contain same elements
- elements are in the same order

Arrays and tuples implement it explicitly - in order to use it, we need to cast
an array to `IStructuralEquatable` and use `Equals` It's not generic.

## Other Notes

In .NET `NULL` always equals `NULL`, i.e.: `Object.Equals(null, null)` returns
`TRUE`.