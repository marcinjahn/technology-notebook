---
title: Cargo
description: Cargo package manager in Rust
lang: en-US
---

# Cargo

It's a **build system** (turns Rust code into executable binaries) and a
**package manager** (downloads and compiles project's dependencies).

`cargo new` creates a new project from a standard template. There's a
`Cargo.toml` file and the `src/` directory.

## Toml file

The `Cargo.toml` files contains project's metadata (like npm's `project.json`).
After running the project, `Cargo.lock` is created as well, which works like
`project-lock.json` of npm. It specifies the exact version numbers of all the
dependencies. This way, future builds are reliable.

## Running

`cargo run` does the following:

- compiles the code in debug mode (for maximal error information) using `cargo
  build`
- executes the binary

Also, a lot of new files are added to the project. They are all managed by
`cargo`.

`cargo run --release` compiles a *release* build.

## Other commands

- `cargo build` - downloads dependencies and compiles the code. It uses the "rustc" compiler behind the scenes.
- `cargo doc` -
builds HTML documentation for every dependency in the current project.
- `cargo init` - initaites a Rust project with pre-existng files in it. `cargo create` would create a project from scratch.
- `cargo add` - adds crates. This subcommand needs to be installed first with `cargo install cargo-edit`.

## Crates

Packages are called *crates*. The open-source ones are shared at https://crates.io.