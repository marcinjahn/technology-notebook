# Collections

## Arrays

Arrays are placed on the stack, since their size is static and
always needs to be predefined.

```rust
let countries = ["Poland", "Brazil"];
```

Iterator is returned with `countries.iter();`.

```rust
for country in countries.iter() {

}
```

Array is typed like this: `[u32, 5]` - 5 elements of type `u32`.
Each array with different type and size is like a separate type in Rust.

## Vectors

Another collection type. It's dynamic, so it's placed on the heap (it's a
struct). `Vec<T>` is like a `List<T>` in C#. They are more expensive than
arrays. Elements are placed next to each other in memory.

Creating vectors:

```rust
let v: Vec<i32> = Vec::new(); //empty
let v = vec![1, 2, 3]; // infers type, uses a macro
```

Operations on vectors:

```rust
let mut v = Vec::new(); // no type needed, it's infered from the code below

// update
v.push(5);
v.push(6);
v.push(7);

// read
let third: &i32 = &v[2];

match v.get(2) {
  Some(third) => println!("The third element is {}", third),
  None => println!("There is no third element."),
} // returns Option<&T>
```

The second way of reading will not panic if we try to access element out of
index. It will return `Option.None` instead.

## HashMaps

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name); // returns Option<&T>
scores.entry(String::from("Yellow")).or_insert(60); // inserts only if Yellow key is not there yet
```