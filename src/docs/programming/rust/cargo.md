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

## Release Profiles

Rust apps have two profiles:

- **dev** (used with `cargo build`) - good defaults for development
- **release** (used with `cargo build --release`) - good defaults for release
  builds

These profiles can be customized in the `Cargo.toml` file. Example:

```toml
[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
```

The `dev` profile has 0 optimizations (because we want it to compile fast even
though the code runs slower).


## Other commands

- `cargo build` - downloads dependencies and compiles the code. It uses the
  "rustc" compiler behind the scenes.
- `cargo doc` - builds HTML documentation for every dependency in the current
  project.
- `cargo init` - initaites a Rust project with pre-existng files in it. `cargo
  create` would create a project from scratch.
- `cargo add` - adds crates. This subcommand needs to be installed first with
  `cargo install cargo-edit`.

## Crates

Packages are called *crates*. The open-source ones are shared at
https://crates.io.

### Binary crates

Binary crates might be installed with `cargo install some-crate`. They will be
installed in `$HOME/.cargo/bin`.