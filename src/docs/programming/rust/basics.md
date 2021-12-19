---
title: Basics
description: Basics of Rust programming language
lang: en-US
---

# Basics

## Variables

Assignment, or more propery, variable binding:

```rust
let a = "abc";
```

An assignment like `a = 10` produces a blank type `()` called _unit_. Whenever
there is no other meaningful response type, `()` is returned.

Varaibles are **immutable** by default.

We can explicitly specify type of a variable:

```rust
let a: i32 = 10;
let b = 10i32;
let c = 10_i32; // Underscore has no meaning, it can be used as a delimiter
```

Variables may be *shadowed*, which means that a variable may be defined twice
with the same name. This way, we don't have to artificially define things like
`data_string` and `data`. FIrst we could define `data` as `String`, and then
define `data` as `i32` with a value coming from parsed `data`.

### Strings

There is a `String` type, which is stored on a heap. There is also a string
literal, which is actually a [string slice](./ownership.md#string-slices).

If a functions expects a string parameter, it's a good practice to use
string slice instead of a `String`, because:

- a string literal can be passed as is;
- a string slice can be easily taken out of a `String` with `&some_streing`

### Collections

#### Arrays

Arrays are placed on the stack, since their size is static and
always needs to be predefined.

```rust
let countries = ["Poland", "Brazil"];
```

Iterator is returned with `countries.iter();`.

```rust
for country in countries.iter() {

}
```

Array is typed like this: `[u32, 5]` - 5 elements of type `u32`.
Each array with different type and size is like a separate type in Rust.

#### Vectors

Another collection type. It's dynamic, so it's placed on the heap.
`Vec<T>`. It is like a `List<T>` in C#. They are more expensive than arrays.

### Scope

Variables that go out of scope are automatically removed by Rust. We don't need
to `free` memory explicitly. There is no runtime overhead for that.

### Deep Copying

Heap data may be copied by value using the `clone()` method.

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

`s1` and `s2` are two different variables pointing at different data in memory
(but the values happen to be the same). `clone()` is much more expensive than a
simple pointer copy.

Values that are stored on the stack (ints, floats, tuples (when they hold scalar
values), arrays, chars, etc.) do not need that.

## Functions

```rust
fn add(a: i32, b: i32) -> i32 {
  i + j
}
```

The `i + j` has no semicolon. With semicolon, the return type would be `()`
instead of `i32`.

Functions return the last expressions' result by default, so `return` is not
required.

## Macros

Macro example:

```rust
println!("Hello");
```

Macros are similar to functions, but instead of returning data, they return
code. They are often used to simplify common patterns.

In case of printing, there are many ways of doing that depending on the provided
data type. The `println!` macro takes care of figuring out the exact method to
call.

## Closures

`|| {...}` syntax is used for closures/lambdas.

```rust
thread::spawn(|| { let data = 500; });
```

## Types

There is a large choice of number types.
Conversions between types are always explicit. We use `as` for that.

Rust does not have constructors. Every time has a literal form (e.g. 
`let a = Complex { re: 2.1, im: -1.4 };`). Many types also have a 
`new` method though (it's not a Rust keyword though, these are just 
normal methods).

## Loops

```rust
for item in collection {

}
```

After such an interation, accessing `collection` is invalid! Rust assumes the
`collection` is no longer needed, its lifetime is finished.

To circumvent it, include the `&` symbol to use a reference:

```rust
for item in &collection {

}
```

To be able to modify `item` during the iteration, a mutable reference should be used:

```rust
for item in &mut collection {

}
```

All three loops shown above are a syntactic sugar for diferent method calls:

- `for item in collection` = `for item in itoIterator::into_iter(collection)`
- `for item in&collection` = `for item in collection.iter()`
- `for item in &mut collection` = `for item in collecion.iter_mut()`

### Index variable

```rust
for i in 0..collection.len() {
  let item = collection[i];
}
```

Such pattern is discouraged in Rust.

### Anonymous loops

```rust
for _ in 0..10 {

}
```

Since a local variable is not needed, `_` is used.

### while(true) alternative

Rust has `loop` loop type:

```rust
loop {
  //break eventually if needed
  break;
}
```

It acts as `while true`, but is preferred.

### Breaking out of nested loops

Loops can be labeled, and nested loops can be exited using the outer loop label.

```rust
'outer: for x in 0.. {
  for y in 0.. {
    for z in 0.. {
      if x + y + z > 1000 {
        break 'outer;
      }
    }
  }
}
```

## Conditions

There is no concept of truthy/falsey values. Conditions relay on `true` and
`false` - that's it.

There is `match`, which is analogous to `switch` in other languages. Compilation
fails if `match` did not cover some relevant alternative.

```rust
match item {
  0 => {},
  10..=20 => {},
  40 | 80 => {},
  _ => {}, // matches all others
}
```

`match` does not fall through through other cases. As soon as a case is matched,
it's executed and `match` is exited.

`match` is very useful with [enums](./enums.md).

## Expressions

Almost everything is an expression. The following are possible:

```rust
let n = 123;
let desc = if is_even(n) {
  "even"
} else {
  "odd"
};

let desc2 = match is_even(n) {
  true => "even",
  false => "odd",
};
```

Even `break` returns a value:

```rust
let n = loop {
  break 123;
}
```

The following are not expressions, thus do not return values:

- expressions delimited by `;`
- binding a name to a value with `=` (isn't that already covered by the first
  rule anyway?)
- type declarations (`fn`, `struct`, `enum` keywords)

## References

References are created with `&`. They are dereferenced with `*`.