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

Another collection type. It's dynamic, so it's placed on the heap.
`Vec<T>` is like a `List<T>` in C#. They are more expensive than arrays.