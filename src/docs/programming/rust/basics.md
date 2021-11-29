# Basics

## Variables

Assignment, or more propery, variable binding:

```rust
let a = "abc";
```

An assignment like `a = 10` produces a blank type `()` called _unit_. Whenever
there is no other meaningful response type, `()` is returned.

Varaibles are **immutable** by default.

We can explicitly specify type of a variable:

```rust
let a: i32 = 10;
let b = 10i32;
let c = 10_i32; // Underscore has no meaning, it can be used as a delimiter
```

### Arrays

```rust
let countries = ["Poland", "Brazil"];
```

Iterator is returned with `countries.iter();`.

Functions return the last expressions' result by default, so `return` is not
required.

```rust
for country in countries.iter() {

}
```

### Scope

Variables that go out of scope are automatically removed by Rust. We don't need
to `free` memory explicitly. There is no runtime overhead for that.

### Ownership

At one point in time, only one variable may _own_ a piece of data.
If a given variable holds data on a stack, the data is just copied:

```rust
let a = 4;
let b = a;
// there will be two "4" on the stack
```

In case of heap data, only the pointer is copied:

```rust
let a = String::from("abc");
let b = a;

// a is no longer a valid variable! b is the owner now!
```



Unique to Rust, the `a` variable becomes invalid when the code above gets
executed. If we try to access it, it will result in a panic. Thanks to it,
during Runtime Rust will not try to `drop` (`free`) this memory space twice,
which would be wrong.
It is called a **move**. `a` gets _moved_ to `b`.

Passing a value to a function also causes a _move_!

```rust
fn main() {
  let s = String::from("abc");
  some_func(s);
  // s is no longer valid. The ownership was moved!
}

fn some_func(data: String) {
  // At the end, `data` goes out of scope and `drop` is called
}
```

A fucntion may also move ownership by returning a value. Then, the calling
function's scope owns the variable.

#### References

Sometimes we want to pass a value to a function, but also to continue to use it
in the calling function. We could make the called function return the passed-in
value, but that would be a weird workaround, especially if that function is
supposed to return some other data as well. **References** come to the rescue.

```rust
fn main() {
  let s1 = String::from("hello");

  // pass as a reference
  let len = calculate_length(&s1);

  println!("The length of '{}' is {}.", s1, len);
  // we can still use `s1`
}

fn calculate_length(s: &String) -> usize {
  s.len()
  // s has no ownership. When it goes out of scope, nothing happens
}
```

![](https://doc.rust-lang.org/book/img/trpl04-05.svg)

Creating a reference is called **borrowing**.
References are *immutable* by default. We can change that:

```rust
fn main() {
  let mut s = String::from("hello");

  change(&mut s);
}

fn change(some_string: &mut String) {
  some_string.push_str(", world");
}
```

Both the `s` variable and the `some_string` reference need to use the `mut`
keyword to allow mutations of the value.

::: fail
At any given time, you can have either one mutable reference or any number of
immutable references. This will fail:

```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s; // Wrong!
println!("{}, {}", r1, r2);
```

Also, if there is an immulable reference, another one that is immutable cannot
be created:

```rust
let mut s = String::from("hello");

let r1 = &s; // no problem
let r2 = &s; // no problem
let r3 = &mut s; // BIG PROBLEM
println!("{}, {}, and {}", r1, r2, r3);
```

That's because if one function would get an immutable reference, it will expect
that the value should not change suddenly.
:::

::: tip
A reference’s scope starts from where it is introduced and continues through the
last time that reference is used.
This is OK:

```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s; // It's OK!
println!("{}", r2);
```

`r1` gets created, but it is never used afterwards. `r2` may be created.
:::

With Rust, it's impossible to have dangling pointers. Rust will complain of such
issues at compile time.



### Deep Copying

Heap data may be copied by value using the `clone()` method.

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

`s1` and `s2` are two different variables pointing at different data in memory
(but the values happen to be the same). `clone()` is much more expensive than a
simple pointer copy.

Values that are stored on the stack (ints, floats, tuples (when they hold scalar
values), arrays, chars, etc.) do not need that.

## Functions

```rust
fn add(a: i32, b: i32) -> i32 {
  i + j
}
```

The `i + j` has no semicolon. With semicolon, the return type would be `()`
instead of `i32`.

## Macros

Macro example:

```rust
println!("Hello");
```

Macros are similar to functions, but instead of returning data, they return
code. They are often used to simplify common patterns.

In case of printing, there are many ways of doing that depending on the provided
data type. The `println!` mactro takes care of figuring out the exact method to
call.

## Closures

`|| {...}` syntax is used for closures/lambdas.

```rust
thread::spawn(|| { let data = 500; });
```

## Types

There is a large choice of number types.
Conversions between types are always explicit. We use `as` for that.

Rust does not have constructors. Every time has a literal form (e.g. 
`let a = Complex { re: 2.1, im: -1.4 };`). Many types also have a 
`new` method though (it's not a Rust keyword though, these are just 
normal methods).

## Loops

```rust
for item in collection {

}
```

After such an interation, accessing `container` is invalid! Rust assumes the
`container` is no longer needed, its lifetime is finished.

To circumvent it, include the `&` symbol to use a reference:

```rust
for item in &collection {

}
```

To be able to modify `item` during the iteration, a mutable reference should be used:

```rust
for item in &mut collection {

}
```

All three loops shown above are a syntactic sugar for diferent method calls:

- `for item in collection` = `for item in itoIterator::into_iter(collection)`
- `for item in&collection` = `for item in collection.iter()`
- `for item in &mut collection` = `for item in collecion.iter_mut()`

### Index variable

```rust
for i in 0..collection.len() {
  let item = collection[i];
}
```

Such pattern is discouraged in Rust.

### Anonymous loops

```rust
for _ in 0..10 {

}
```

Since a local variable is not needed, `_` is used.

### while(true) alternative

Rust has `loop` loop type:

```rust
loop {
  //break eventually if needed
  break;
}
```

It acts as `while true`, but is preferred.

### Breaking out of nested loops

Loops can be labeled, and nested loops can be exited using the outer loop label.

```rust
'outer: for x in 0.. {
  for y in 0.. {
    for z in 0.. {
      if x + y + z > 1000 {
        break 'outer;
      }
    }
  }
}
```

## Conditions

There is no concept of "truthy|"/"falsey" values. Conditions relay on `true` and
`false` - that's it.

There is `match`, which is analogous to `switch` in other languages. rustc warns
if `match` did not cover some relevant alternative.

```rust
match item {
  0 => {},
  10..=20 => {},
  40 | 80 => {},
  _ => {},
}
```

`match` does not fall through through other cases. As soon as a case is matched,
it's executed and `match` is exited.

## Expressions

Almost everything is an expression. The following are possible:

```rust
let n = 123;
let desc = if is_even(n) {
  "even"
} else {
  "odd"
};

let desc2 = match is_even(n) {
  true => "even",
  false => "odd",
};
```

Even `break` returns a value:

```rust
let n = loop {
  break 123;
}
```

The following are not expressions, thus do not return values:

- expressions delimited by `;`
- binding a name to a vlue with `=` (? isn't that already covered by the first
  rule anyway?)
- type declarations (`fn`, `struct`, `enum` keywords)

## References

References are created with `&`. They are dereferenced with `*`.
