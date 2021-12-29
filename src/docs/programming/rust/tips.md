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