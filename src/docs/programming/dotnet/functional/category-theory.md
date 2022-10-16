---
title: Category Theory
description: Some core principles of Category Thory which will be helpful in understanding Functional Programming
tags: category theory, fp, functional programming
lang: en-US
---


# Category Theory

## Monoid

A monoid is a combination of a set and an operation. In programming, a set is a
data type (like a `DateTime`). A **monoid** is a subset of a *semigroup*, it is
more strict than the latter. A monoid has the following requirements:

- operation must be *binary* - it acts on two inputs (e.g. addition, or a
  function `(Car, Car) => Car`)
- it must be *associative* - e.g., `(1 + 2) + 3 = 1 + (2 + 3)` - order of
  evaluation does not matter, the result is the same
- there's a *neutral element*, sometimes also called the *identity element* -
  it's a value that is neutral in a sense that it does not incur any change, it
  does nothing when an operation is applied to it. An example of an identity
  element in the addition operation is `0`, because `a + 0 = a`. For
  multiplication, the identity element is `1`, since `a * 1 = a`.

A monoid could also be described as a triplet consisiting of:

- a set
- an operation
- an identity element

The above triplet must satisfy the aforementioned rules.

### Examples

- Addition on numbers, 0 is the identity
- Multiplication on numbers, 1 is the identity
- AND on boolean numbers, 1 is the identity
- OR on boolean numbers, 0 is the identity
- Concatenation on a collection, empty collection is the identity
