# Traits

A **trait** is analogous to an interface or portocol from other languages. It enables types to advertise that tey use some common behaviour.

All of Rust's operations are defined with traits. E.g., aaddition (*+*) is defined as the `std::ops::Add` trait. Operators are just syntactic sugar for traits' methods.

`a + b` = `a.add(b)`

