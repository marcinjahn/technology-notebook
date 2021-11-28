---
tags: javascript, node
---

# NodeJS

## Facts

### CommonJS Modules

#### Wrapping

Modules in NodeJS are not actually executed as-is. Instead, they are wrapped in
a function - this function comes with parameters, like:

- require - the `require` function
- module - we se the module's exports here
- others

The `require` function returns what module sets in `module.exports` - it can do
it, because `require` actually INVOKES the wrapper function, and provides to it
the fresh instance of `Module`.

![](https://i.imgur.com/dVNirQb.png)


#### Multiple requires

If we call `require` to import the same module multiple times (from the same
file or from other files, doesn't matter), the module's code will be executed
only once! If our module would export some object, modification of that object
would be seen EVERYWHERE where this module gets imported.

It makes it easy to have singleton modules.

## Source

https://www.udemy.com/course/understand-nodejs/