---
title: Raw Pointers
description: Raw Pointers in Rust
lang: en-US
---

# Raw Pointers

A raw pointer is a memory address without Rust's standard guarantees. They are 
unsafe, they can be null. Rust's references use raw pointers under the hood.

They are written as either `*const T` (immutable) or `*mut T` (mutable). One can be
casted to another.