---
title: JS Functions
description: How JS Functions work
tags: javascript, typescript
lang: en-US
---

# JS Functions

## Arguments

Function has an `arguments` object containing all of the arguments passed by the
called (even if function does not define any parameter, you can still pass
arguments).

Arrow functions do not have this parameter.

## Arrow Functions

`this` is inherited from the scope where arrow function was defined.

## Functions' Functions

### call()

`call()` allows to invoke any function in a context of any object.

```js
let person = {
    name: "John"
}

function sayHi() {
    console.log('Hi, ', this.name)
}

sayHi.call(person) //Hi, John
```

If the function accepts arguments, we can pas them in via consecutive parameters
of `call`.

### apply()

Works like `call()`, but it accepts parameters as an array instead of
consecutive parameters.

### bind()

Creates a copy of a function in a context of some other object.

```js
let person1 = {
    name: "John",
    sayName() {
        console.log(this.name)
    }
}

let person2 = {
    name: "Sophia"
}

let bound = person1.sayName.bind(person2)

bound() //Sophia
```

It doesn't modify `person1` nor `person2`.

It can also be used to create a new function that used some preset argument
value. I.e.:

```js
function multiply(x, y) {
    return x * y;
}

let multiplyBy2 = multiply.bind(this, 2); // x = 2
multiplyBy2(4) // 2 * 4
```

## Rest

It behaves like `params` in C#. Rest can appear only at the end of the
parameters list.

```js
function sayNames(...names) {
    foreach (name of names) {
        console.log(name)
    }
}
```~~