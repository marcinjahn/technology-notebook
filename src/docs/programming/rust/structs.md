# Structures

Structs are like structs/classes in other languages. Structs have fields.
We can instantaite structs.

```rust
struct User {
  active: bool,
  username: String,
  email: String,
  age: u32
}

let user1 = User {
  email: String::from("user1@gmail.com"),
  username: String::from("user1"),
  active: true,
  age: 20
};
```

Only mutable instances may be mutated:

```rust
let mut user2 = User {
  email: String::from("user2@gmail.com"),
  username: String::from("user2"),
  active: true,
  age: 19
};

user2.active = false;
```

## Shortcuts

A bit like in JS, we can use the shorter way to instantiate objects:

```rust
fn create_object(username: String, email: String) -> User {
  User {
    username,
    email, // or email: email
    active: false,
    age: 100
  }
}
```

Also, we can create an instances based on other instances:

```rust
let user3 = User {
  email: String::from("user3@example.com"),
  ..user2 // must come last
};
```

::: warn Move
`user2` was **moved** in the example above. Since `username` is a `String`, it
was moved to `user3`. If the only values that were copied from `user2` were
`active` and `age`, there would be no move. They'd be just copied.
:::

## Tuple Structs

Tuples may be defined with a name, like this:

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

The fields don't have names, sometimes it's ok for simple types.

## Unit-like Structs

Structs may be completely empty:

```rust
struct AlwaysEqual;

let subject = AlwaysEqual;
```

It's useful with traits.