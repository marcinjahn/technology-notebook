---
title: Generics
description: Generics in Rust
lang: en-US
---

# Generics

Generics may be used in:

- structs
- functions
- enums
- methods

::: tip Monomorphization
Generics are not slower than non-generic code. Rust generates concrete types for
the generics during compilation. It looks at all the usages of generics in our
code and creates types for all the ways that we use them. It's called
**monomorphization**. E.g. `Option<i32>` becomes `Option_i32`.
:::

## Functions

Function example:

```rust
fn largest<T>(list: &[T]) -> T {
  let mut largest = list[0];

  for &item in list {
    if item > largest {
      largest = item;
    }
  }
  largest
}
```

The function `largest` is generic over some type `T`.

We can call this function like this:

```rust
let number_list = vec![34, 50, 25, 100, 65];
let result = largest(&number_list);
```

## Structs

Struct example:

```rust
struct Point<T> {
  x: T,
  y: T,
}

fn main() {
  let integer = Point { x: 5, y: 10 };
  let float = Point { x: 1.0, y: 4.0 };
}
```

## Enums

Enum example:

```rust
enum Option<T> {
  Some(T),
  None,
}
```

## Methods

Method example:

```rust
struct Point<T> {
  x: T,
  y: T,
}

// the T after impl means that we're defining this method generically
// and T is not any specific type
impl<T> Point<T> {
  fn x(&self) -> &T {
    &self.x
  }
}
```

We can also specify a method for a concrete type `T`:

```rust
impl Point<f32> {
  fn distance_from_origin(&self) -> f32 {
    (self.x.powi(2) + self.y.powi(2)).sqrt()
  }
}
```

::: tip
In the code above, there is no type after `impl`, since this method is
not generic! Only `Point<f32>` instances will have this method.
:::