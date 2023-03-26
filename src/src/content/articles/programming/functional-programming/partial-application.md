---
title: Partial Application
description: Functional Programming in C# - Partial Application
tags: [".net", "asp.net", "c#"]
lang: en-US
---

# Partial Application

Sometimes it would make sense to invoke some functions partially. It could be
that that function requires a few parameters, but we know just a couple of them.
Later, we'd be able to provide the rest of the parameters. An example of that
could be a function that requires some configuration. If the configuration never
changes throughout the lifetime of the app, it makes sense to provide that
configuration once. Later, we could use the function without providing the
configuration every time. An example could be some function that retrieves data
from a database. The connection string will probably not change during runtime.

```csharpharp
var greet = (string greeting, string name) => $"{greeting}, {name}";

greet("Hello", "Kelly");
greet("Hello", "Scott");
greet("Hello", "Mary");
```

The function above requires us to provide both parameters at once. We could
change it to a HOF, like this:

```csharpharp
var greet = (string greeting) => (string name) => $"{greeting}, {name}";

var greetWith = greet("Hello");
greetWith("Kelly");
greetWith("Scott");
greetWith("Mary");
```

The `"Hello"` is captured in a closure. The function is now in a **curried**
form.

::: tip Haskell
In Haskell, the above behavior is a normal behavior of any function. Whenever we
define a function with multiple parameters, in reality, we're creating partial
functions. The syntax of Haskell makes it very natural.

```haskell
multiplyThree :: (Num a) => a -> a -> a -> a

let multiplyTwoWithNine = multiplyThree 9 -- returns a function
multiplyTwoWithNine 2 3 -- returns 54
```

The parameters are separated by `->`, the same way as the final result of the
function is separated from the parameters. That's because this function actually
consists of three partial functions. 
:::

### Apply

There is a way to turn multi-parameter functions into partial functions, with
the help of an implementation of the `Apply` function which relies on closures:

```csharpharp
public static Func<T2, R> Apply<T1, T2, R>(this Func<T1, T2, R> func, T1 parameter) =>
    t2 => func(t1, t2);
```

::: tip
`T1` and `T2` are the types of `func`'s parameters. `R` is the type of the
`func`'s output.

The code above is for a binary function. Overloads for other parameter counts
should also be provided.
:::

Usage:

```csharpharp
var greet = (string greeting, string name) => $"{greeting}, {name}";

var greetWith = greet.Apply("Hello");
greetWith("Kelly");
greetWith("Scott");
greetWith("Mary");
```

Partial function application allows us to create very generic functions that may
be turned into more specific ones. The consuming code does not need to know that
it's invoking a partial function.

::: danger
The `Apply` example above would not look that nice if `greet` was a method (and
not a delegate). In such a case, the compiler does not infer the method as a
`Func` automatically.

```csharpharp
string Greet(string greeting, string name) => $"{greeting}, {name}";

var greetWith = new Func<string, string, string>(Greet).Apply("Hello");
```

Workarounds:

- using a delegate field - these don't allow to access other members of the class
- using a getter-only property to return a delegate - can't use generics
- **using a method that returns a delegate (factory method)** - the most powerful

An example of the last approach:

```csharpharp
public Func<string, string, string> GreetFactory() =>
    (greeting, name) => $"{greeting}, {name}";

var greetWith = SomeClass.GreetFactory().Apply("Hello");
```
:::

::: danger Generic Functions
Unfortunately C# does not allow us to defer the resolution of generic types. The
first time we execute the `Apply` function, the specific type `T` needs to be
provided.
:::

## Currying

Currying is similar to *partial application*. The difference is:

- in *partial application* we provide some parameters of the function to get a
  new function that expects the rest of the parameters
- in *currying* we transform a function into a curried function (no need to
  provide any parametes while transforming)

Here' an example of an implementation of a `Curry` function:

```csharpharp
Func<T1, Func<T2, R>> Curry<T1, T2, R>(this Func<T1, T2, R> func) =>
    t1 => t2 => func(t1, t2);

var curriedGreet = greet.Curry();
var greetWith = curriedGreet("Hello");
```

It's very similar to `Apply`. However, `Curry` does not expect any `t1`. It just
transforms the original function into a curried one.

::: tip
`Apply` and `Curry` are very generic. It is OK to create our own custom functions
that turn other functions into specialized forms.

Example:

```csharpharp
// a function factory
Func<string, IEnumerable<T>> CreateRetriever<T>(
    this string connectionString, string sqlTemplate) => 
        param => Query(
            connectionString, 
            connection => connection.Query<T>(sqlTemplate, param));

// creation of a specialized function
var queryById = connString.CreteRetriever("SELECT * FROM PEOPLE WHERE ID = @id");
let person = queryById(123); // retrieves person with ID = 123
```
:::