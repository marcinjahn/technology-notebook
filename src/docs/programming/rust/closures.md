---
title: Closures
description: Closures/lambdas in Rust
lang: en-US
---

# Closures

Multiple lines:

```rust
let closure = |num| {
  println!("calculating...");
  thread::sleep(Duration::from_secs(2));
  num
};
```

Single line:

```rust
let closure = |num| num + 2;
// or
thread::spawn(|| { let data = 500; });
```

Closures in variables do not need type specification, because they are private
to functions and are not exposes outside. Instead, we allow the compiler to
infer all that information. However, we can add types if we want to.

```rust
let closure = |num: i32| -> i32 {
  println!("calculating...");
  thread::sleep(Duration::from_secs(2));
  num
};
```

::: tip
Unannotated closures have to be called for the program to compile. The compiler
cannot infer the types without seeing how a closure is used
:::

::: danger
An unannotated closure cannot be used with different types, such a program will
not compile.

````rust
let c = |x| x;
c(1);
c("abc"); // WRONG! The closure was already compiled for i32
````
:::

## Caching Results

Sometimes it might be useful to define a closure that calculates some result that
we want to reuse multiple times. We use structs for that.
It's analogical to `Lazy<T>` of .NET C#.

```rust
struct Cacher<T>
  where T: Fn(u32) -> u32,
{
  calculation: T,
  value: Option<u32>,
}

impl<T> Cacher<T>
where T: Fn(u32) -> u32,
{
  fn new(calculation: T) -> Cacher<T> {
    Cacher {
      calculation,
      value: None,
    }
  }

  fn value(&mut self, arg: u32) -> u32 {
    match self.value {
      Some(v) => v,
      None => {
        let v = (self.calculation)(arg); // why so many parentheses?
        self.value = Some(v);
        v
      }
    }
  }
}
```

When we ask for a `value()`, the first time we do it, closure will be executed.
Consecutive `value()` calls will return a cached value of the closure's result.

When defining closure as a field of a struct, we need to specify its type. In
the case above, the type is `Fn(u32) -> u32`.

## Capturing Environment

Closures can capture variables defined outside of the closure:

```rust
fn main() {
  let x = 4;
  let equal_to_x = |z| z == x; // captures x
  let y = 4;
  assert!(equal_to_x(y));
}
```

Functions cannot do that. Captures can be done in three ways, depending on the
`Fn...` trait being used:

- `FnOnce` - takes ownership of the captured variables. It can be called only once,
  because it can't take ownership of some external value twice.
- `FnMut` - it mutably borrows external values.
- `Fn` - it immutably borrows external values.

::: tip Closure traits
- Closure can implement one, two, or all of these traits.
- By default, all closures implements `FnOnce`.
- We can force closue to take ownership by using the `move` keyword in front of
  the closure
- when choosing the trait, it's a good idea to start from `Fn` and change it
  only if necessary
:::
