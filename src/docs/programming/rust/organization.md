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

The root of every module is `crate`. It is either `src/main.rs` or `src/lib.rs`.
There is a module tree similar to filesystem:

```
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

## Paths

To refer to an entity we can use *absolute* or *relative* paths.
We separate identifiers by `::`.

Example:

```rust
mod front_of_house {
  pub mod hosting {
    pub fn add_to_waitlist() {}
  }
}

pub fn eat_at_restaurant() {
  // Absolute path
  crate::front_of_house::hosting::add_to_waitlist();

  // Relative path
  front_of_house::hosting::add_to_waitlist();
}
```

`super` acts like `..` in Unix filesystems. We can use it to go up a module.

## Encapsulation

- All entities are private by default.
- The privacy rules apply to *structs*, *enums*, *functions*, *methods*, and
  *modules*.
- Items in a parent module cannot use the privte items inside child modules.
- items in child modules can use items in their ancestor modules.
- sibling items can access each other.
- items can be made public with the `pub` keyword.
- struct can be made public, but its fields will stay private unless they are
  individually made public:

  ```rust
  pub struct Breakfast {
    pub toast: String,
    seasonal_fruit: String,
  }
  ```

- all enum's options are public if enum itself is public.

## Importing

The `use` keyword brings a path into the local scope so we don't have to repeat
paths all the time.

Example:

```rust
mod front_of_house {
  pub mod hosting {
    pub fn add_to_waitlist() {}
  }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
  hosting::add_to_waitlist();
  hosting::add_to_waitlist();
  hosting::add_to_waitlist();
}
```

`use` is like a symbolic link in a filesystem.

Relative paths can be used with `use` as well.

::: tip 
There's a "best practice" to bring functions via their containing
module, and not the function name directly. That makes it more clear that the
function is not local when we call it. Other items should be brought in
directly, like the `HashMap`:

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}
```
:::

The imported entities may be re-exported with the use of `pub use`:

```
pub use crate::front_of_house::hosting;
```

### Changing names

If there are entities with the same names (e.g. two structs) we can't import
them both directly. Instead, we should impoer their containing modules.

```rust
use std::io;

fn function1() -> fmt::Result {}

fn function2() -> io::Result<()> {}
```

We could also change name of an imported entity using the `as` keyword:

```rust
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {}

fn function2() -> IoResult<()> {}
```

### Importing all

The `*` (glob) operator allows us to bring in all items from some module:

```rust
use std::collections::*;
```