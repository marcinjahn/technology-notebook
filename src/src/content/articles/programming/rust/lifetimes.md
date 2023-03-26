---
title: Lifetimes
description: Lifetimes in Rust
lang: en-US
---

# Lifetimes

References have their lifetimes, which define a scope for when a reference is
valid. Lifetimes can be implicitly infered but sometimes we need to specify them
explicitly. The main aim of lifetimes is to **prevent dangling references**.

::: tip
Validity of lifetimes is checked during compilation by the **borrow checker**.
:::

Example:

```rust
{
  let r;                // ---------+-- 'a
                        //          |
  {                     //          |
    let x = 5;          // -+-- 'b  |
    r = &x;             //  |       |
  }                     // -+       |
                        //          |
  println!("r: {}", r); //          |
}                       // ---------+
```

The program will not compile, because we're trying to print reference `r`, which
points to `x` that already went out of scope (its lifetime `'b` is over).

## Lifetime Elision

Not all usages of references require explicit lifetime annotations. There are 
some situations where the compiler is able to infer the proper lifetimes on its
own.

There are three rules of how compiler infers lifetimes. They apply to functions
and methods:

1. Each parameter that is a reference gets its own lifetime parameter.
2. If there is exactly one input parameter, its lifetime is assigned to all
   output parameters (that's one functions with one parameter don't need
   lifetime specifications).
3. If there are multiple input parameters, but one of them is `&self` or `mut
   &self` (so, it's a method), the lifetime of `self` is alligned to all output
   parameters.

If after applying these rules there are still some references left without
lifetime information, compilation will fail and explicit lifetime information
will be required.

## Lifetime Annotations

Lifetime annotations describe the relationships of the lifetimes of multiple
references to each other without affecting the lifetimes.

```rust
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

::: tip
`'a` is a common naming convention for lifetimes. It could be some word too.
:::

### Functions

Lifetime annotations in functions have meaning only when multiple types have
annotations. Then the compiler can understand if some bindings have the same or
different lifetimes.

Here's a function that will not compile due to lack of lifetime annotations:

```rust
fn longest(x: &str, y: &str) -> &str {
  if x.len() > y.len() {
    x
  } else {
    y
  }
}
```

The compiler needs to know how the returned reference is related to the parameters
of the function.

::: tip
When returning a reference from a function, it has to be one of the references
passed as arguments of the function. Otherwise, the reference would have to be
created from some local function's variable. The returned value would be a
dangling pointer!

What if I want to return a reference to some global/static value? Isn't it allowed?
:::

Here's a valid version:

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  if x.len() > y.len() {
    x
  } else {
    y
  }
}
```

::: tip Generics
Lifetimes are defined similarly to generic types.
:::

Potentially, the compiler could infer the lifetime knowledge from the code
itself - since I'm returning either `x` or `y`, probably the lifetime of the
result should be the smallest common lifetime of these. However, that would bind
the lifetime of the result with that particular implementation! If I, as an
author of that function, change this implementation one day to always return
`x`, the lifetime infered by the compiler will change! It could than break some
code of clients of this function. That's why Rust requires us to specify the
lifetime information explicitly.

::: tip
When returning a reference from a function, the lifetime parameter for the
return type needs to match the lifetime parameter for one of the parameters.
:::

Since the function can return either `x` or `y` reference, the lifetime of both
the parameters and the return value will be the same - `'a`. The function
signature now tells Rust that for some lifetime `'a`, the function takes two
parameters, both of which are string slices that live at least as long as
lifetime `'a`. Additionally, the string slice returned from the function will
live at least as long as lifetime `'a`.

When we pass concrete references to `longest`, the concrete lifetime that is
substituted for `'a` is the part of the scope of `x` that overlaps with the
scope of `y`. In other words, the generic lifetime `'a` will get the concrete
lifetime that is **equal to the smaller of the lifetimes of `x` and `y`**.
Because we’ve annotated the returned reference with the same lifetime parameter
`'a`, the returned reference will also be valid for the length of the smaller of
the lifetimes of `x` and `y`.

::: tip
When we specify the lifetime parameters in the function signature, **we’re not
changing the lifetimes** of any values passed in or returned. Rather, we’re
specifying that the borrow checker should reject any values that don’t adhere to
these constraints.
:::

#### Using a function with lifetimes defined

Here're examples of how lifetimes help in enforcing proper usage of references
in terms of scope:

```rust
fn main() {
  let string1 = String::from("long string is long");
  {
    let string2 = String::from("xyz");
    let result = longest(string1.as_str(), string2.as_str());
    println!("The longest string is {}", result); // GOOD
  }
}
```

In the code above, `string2` has shorter lifetime than `string1`. It means that
the lifetime of `result` will end at the same time as `string2`'s. Since we're
using `result` when the lifetime is still valid, the code compiles and runs.

```rust
fn main() {
  let string1 = String::from("long string is long");
  let result;
  {
    let string2 = String::from("xyz");
    result = longest(string1.as_str(), string2.as_str());
  }
  println!("The longest string is {}", result);
}
```

In the code above, the situation is similar, however, we're trying to use (print)
`result` outside of the inner scope, when the lifetime of `string2` is already
over. Since the lifetime of `result` is the same as that of `string2`, `result` 
cannot be used at this point. The code fails to compile.

### Structs

If a struct contains references as fields, they all need to have lifetime
annotations.

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
  let langs = String::from("rust,js,c#");
  let first_lang = novel.split(',').next().expect("Could not find a ','");
  let i = ImportantExcerpt {
    part: first_lang,
  };
}
```

This annotation means an instance of `ImportantExcerpt` can’t outlive the
reference it holds in its `part` field.

#### Struct Methods

```rust
impl<'a> ImportantExcerpt<'a> {
  fn announce_and_return_part(&self, announcement: &str) -> &str {
    println!("Attention please: {}", announcement);
    self.part
  }
}
```

Thanks to the [elision rules](#lifetime-elision) we don't have to annotate the
method explicitly. The lifetime of the output `&str` is the same as the lifetime
of the object (`&self`).

## Static Lifetime

There is a special lifetime - `'static` - which marks a value pointed by a
reference to be "alive" during the entire execution of the program.

::: tip String Literals
All string literals have `'static` lifetime. We can annotate them explicitly:

```rust
let s1: &'static str = "Explicit static lifetime";
let s1 = "Implicit static lifetime";
```

The texts are stored directly in program's binary.
:::

