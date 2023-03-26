---
title: Tips
description: Various tips useful when creating programs with Rust
lang: en-US
---

# Tips

## CLI Apps

- `std::env::args()` returns an iterator to command line arguments.
- `std::process::exit(1)` terminates the program with some exit code.
- keeping `src/main.rs` short is a good practice. The logic should be moved to
  separate files like `src/lib.rs`. That also makes the logic testable (binary
  crates are not testable).
- `eprintln!` macro prints to stderr.
- a **clap** cargo is useful for defining CLI arguments

## Documentation

Rust has built-in documentation for code. Our code can be documented as well.

### Documenting files

Here's an example:

```rust
//! # My Crate
//!
//! `my_crate` is a collection of utilities to make performing certain
//! calculations more convenient.
```

It is some more general documentation about our crate. It could appear
in the `src/lib.rs`.

### Documenting functions

Here's an example:

```rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ```
pub fn add_one(x: i32) -> i32 {
  x + 1
}
```

The documentation should appear just before the documented element.

### Cargo

We generate the docs with `cargo doc`. It runs `rustdoc` internally.
The HTML docs are placed in `target/doc`.

::: tip
Running `cargo doc --open` generates and opens the docs automatically.
:::

### Tests

Documentation might also contain example code. That code is run automatically
with `cargo test`. In the example code shown previousy, the example code would
be run.