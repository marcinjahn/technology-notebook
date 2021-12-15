---
title: JavaScript - The Weird Parts
description: A summary of Udemy JS course
tags: javascript
lang: en-US
---

# JavaScript - The Weird Parts

## Videos

[Udemy](https://www.udemy.com/course/understand-javascript/)
[YT](https://www.youtube.com/watch?v=Bv_5Zv5c-Ts)

## Definitions

**Hoisting** - before code in a file is executed, the engine looks at all
functions and variables, and reserves space for them in the memory. That's why
we can call a function that has been defined later in the code. Variables
(`var`) get `undefined` value during hoisting, even though they could have some
proper assignments (i.e., `var a = 4`).

**Execution Context** - every code is executed in some Execution Context. There
is a Global Exectuion Context, which has:

- global object (i.e., `window`)
- `this` variable - set to the global object
- outer object - for Global Execution Context, it's `null`.

Each function call creates a new Execution Context, and it's put on top of the
stack.

**Lexical Environment** - it depends from where a given code is placed. Is it a
global (most outer) space? Is it in some function? Depending from it, the code
might work differently. I.e., if we want to use some variable that was not
defined in a current Execution Context, based on Lexical Environment, the outer
reference is examined. I.e., if there is a function defined in the global space,
the global space could contain some variable that we're using in the function.
This creates a *Scope Chain*.

**Scope Chain** - a chain of outer references. If we have function defined in
another function - that creates another element in the chain.

Execution Context Stack will always be "linear" - one parent, one child.
However, scope chain may have multiple contexts at the same level - i.e., all
functions defined in global space (which is their Lexical Environment).

**Event Queue** - there is a queue of events that have some handlers attached
(i.e. for clicks). This queue is handled by JS engine ONLY when the Execution
Context Stack is empty. I.e., if some long function is running, no handlers will
run. However, the events get added to the Queue as they happen (asynchronously,
and concurrently to the currently executing code).

## Facts

**Default parameter value** - if a function has some argument and we don't pass
anything, the value of it will be `undefined` in the function.

**Operators return values** - operators in JS act like functions. They do return
values! Examples:

- an assignment operator (`=`) returns the value that was assigned.
- an OR operator (`||`) returns the first value (from left to right) that
  coerces to `true`. I.e., `false || "hi"` returns `"hi"` `"Hello" || "Hi"`
  returns `"Hello"`.

The second one is useful for short conditionals:

```js
let a = getValueOrNot() || 'default value'
```

In the above example, if `getValueOrNot()` returns non-truthy value (like
`null`, `undefined`, `""`, `0` (!)) the `'default value'` will be used instead.


**Multiple script tags** - if we have multiple JS scripts attached to HTML, all
of them actually work in the same Global Context. It works as if all the files
were concatenated together into on file. If something gets set in the Global
Context in one file, other files see it.

### this

- **Global**

    ```js
    console.log(this)
    ```

    Returns a `Window`.

- **in a function**

    ```js
    a()

    function a() {
        console.log(this)
    }
    ```

    Again, returns a `Window`.

- **in an object's method**

    ```js
    let a = {
        name: "1",
        func: function() {
            console.log(this)
        }
    }

    a.func()
    ```

    Returns `a`. If `a` became a prototype of some other object `b`, `this`
    would refer to `b` instead.

- **function defined in an object's method**

    ```js
    let a = {
        name: "1",
        func: function() {
            let innerfunc = function() {
                console.log(this)
            }
            innerfunc()
        }
    }

    a.func()
    ```

    Returns a `Window` (!).

### IIFE

How IIFEs work:

1. I can place any expression and JS will not complain. I.e.,

    ```js
    4
    'some string'
    {
        name: "John"
    }
    ```

2. I can't put a function EXPRESSION on its own, because it would be interpreted
   as a function STATEMENT:

    ```js
    function(name) {
        // Do something
    }
    ```

    This will throw an error:

    > Uncaught SyntaxError: Function statements require a function name

3. To "trick" JS into interpreting it as a FUNCTION EXPRESSION, we wrap it in
   parentheses:

    ```js
    (function(name) {
        // Do something
    })
    ```

    Now, since the line does not start from a `function` keyword, JS interpreter
    no longer expects a FUNCTION STATEMENT.

4. To run our function expression immediately, we just add `()` to invoke it:

    ```js
    (function(name) {
        // Do something
    }())
    ```

    The invocation can be done inside or outside of wrapping parentheses:

    ```js
    (function(name) {
        // Do something
    })()
    ```

The way it works is that function expression returns an object - a function
itself. We can then execute it, like any function.

As a good practice, putting a semicolon before IIFE might help if some code
loaded before our file does not use semicolons, causing interpreter to be
confused somehow.

### Primitives vs Objects

I can create a primitive like this: `a = "john"`. I can also create an object:
`b = new String("John")`. The methods/properties of String are defined on
`String.prototype`. So how are we able to invoke them on primitive (i.e.,
`a.length`)? JS engine "boxes" the primitive into an object behind the scenes
and then accesses the property/method (this happens only for strings and
arrays).

#### new vs ...

```js
a = Number("3");      // returns a primitive (USE THIS ONE)
a = new Number("3");  // returns an object
```

- **null is object?** - a bug in JS is that `typeof null` returns `"object"`.