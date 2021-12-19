---
title: Organization
description: Modules, packages in Rust
lang: en-US
---

# Organization

Rust has a number of features that allow to manage code’s organization,
including which details are exposed, which details are private, and what names
are in each scope in programs. These features, sometimes collectively referred
to as the module system, include:

- **Crates**: a binary or library
- **Packages**: one or more crates that provide a set of functionality. A
  package contains a `Cargo.toml` file
- **Modules**: let us organize code within a crate into groups for readability
  and easy reuse
- **Paths**: A way of naming an item, such as a struct, function, or module

## Packages

A package contains crates. It can be as many binary crates as needed and just
one library crate.
We create packages with `cargo new my-project-name`.

## Modules

Modules control encapsulation. Some items might be *public*, others can be
*private*. Modules may be nested.

Example:

```rust
mod front_of_house {
  mod hosting {
    fn add_to_waitlist() {}

    fn seat_at_table() {}
  }

  mod serving {
    fn take_order() {}

    fn serve_order() {}

    fn take_payment() {}
  }
}
```

Modules may contain definitions of anything (modules, functions, structs, enums,
etc.).

