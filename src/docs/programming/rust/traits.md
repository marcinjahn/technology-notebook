---
title: Traits
description: Traits in Rust
lang: en-US
---

# Traits

A **trait** is analogous to an interface or protocol from other languages. It enables types to advertise that they use some common behaviour.

All of Rust's operations are defined with traits. E.g., aaddition (`+`) is defined as the `std::ops::Add` trait. Operators are just syntactic sugar for traits' methods.

`a + b` = `a.add(b)`

## Debug

`#[derive(Debug)]` before struct's definition makes that struct printable in debug mode (`print!("{}", instance)`).

Another way to debug print is with the use of `dbg!(&instance)`.