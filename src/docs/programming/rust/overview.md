---
title: Overview
description: Some overview of Rust
lang: en-US
---

# Overview

## Why Rust?

Rust eliminates bugs related to invalid data access. These bugs stand for 70% of
all reportedly.

Rust is memory-safe without imposing any runtime costs.

Other languages can also be safe, but require runtme checks that slows them
down. Rust provides both **safety** and **control**.

Rust's goals:

- Safety
- Productivity/Performance
- Control

### Safety

- no dangling pointers
- no data races (inability to determine how a program will behave from run to
  run). Rust will not allow to modify variable in different threads.
- no buffer overflow (accessing array elements at index that doesn't exist)
- no iterator invalidation - changing a thing being iterated midway through
- no integer overflow in debug mode

Sometimes a term "fearless concurrency" is used to express the safety that Rust
gives to programmers.

Data within Rust is immutable by default.

### Productivity/Performance

Rust provides very informative error messages.
There is no Garbage Collector

### Control

Programmers have cntrol over how data structures are laid out in memory and how
they're accessed. There are some sensible defaults as well.

- Data may be stored on a "stack" or on the "heap".
- "Reference counting" might be added.
- Own types of pointers might be created for a particular access pattern.

## Downsides

Rust is not good with cyclic data structures. Implementing doubly-linked list
might not be easy for a beginner in Rust.

Compilation is slower than in peer languages.

Rust has steep learning curve due to it being "large". Lots of functionalities,
keywords, etc.

## References

- [The Rust Programming Language Book](https://doc.rust-lang.org/book/)
- [https://fasterthanli.me/articles/working-with-strings-in-rust](https://fasterthanli.me/articles/working-with-strings-in-rust)