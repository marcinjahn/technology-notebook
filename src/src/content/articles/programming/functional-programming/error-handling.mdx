---
title: Error Handling
description: Functional Programming in C# - Error Handling
tags: [".net", "asp.net", "c#"]
lang: en-US
---

# Error Handling

In imperative programs, it's normal to see `throw` statements or `try/catch`.
Exceptions are discouraged in FP. Instead, the return value of a function should
contain information about the possible error. It's very similar to Rust's
`Result<T,E>`.

In FP, the `Either` type is used to signal that an operation can potentially
fail. It's quite similar to `Option<T>`. The difference is that the "bad" case
may return an additional payload, unlike `None` that doesn't bear any additional
information on why `None` was returned.

`Either` has two possible variants:

- `Left<L>` - failure
- `Right<R>` - success

:::tip[Where]
Among the typical FP functions (`Map`, `Bind`, `Where`, etc.), the `Where`
function is not applicable to `Either`. That's because `Where` only accepts a
predicate that returns a boolean. It is unable to create a proper `Left<L>`. A
workaround is to use `Bind` with a function that either returns `Right<R>` or
`Left<L>`

```csharp
Right(person)
    .Bind(CheckAge) // with Option<T> it'd be .Where(HasRightAge)
    .Bind(Greet)
    .Bind(LetIn);

Either<Rejection, Person> CheckAge(Person p)
{
    if (person.Age >= 18) return p;
    else return new Rejection("Age less than 18");
}
```
:::

## Checking For Errors

Typically, `Either`-based flows follow a track where each function may either
succeed or fail. At the end of the flow, the failure scenario should be checked.

```csharp
Right(person)
    .Bind(CheckAge) // with Option<T> it'd be .Where(HasRightAge)
    .Bind(Greet)
    .Bind(LetIn)
    .Match(
        Right: _ => {},
        Left: rejection => 
        {
            LogRejection(rejection); // impure function
        }
    );
```

:::tip[Left track]
Once any of the functions returns `Left<T>` there is no way back to the "right"
track.
:::

## Error Types

There should be a special type for the "left" (error) scenario. We could have a
simple base `Error` with all necessary properties (like `string Message`) and,
when needed, we could create derived error types. Such error types could contain
predefined error messages for convenience.

```csharp
record UserDoesntExist() 
    : Error("The provided username does not exist");
```

:::tip
Custom error types help to establish a domain, they give a good overview of
possible errors.
:::

## Throwing Exceptions

It is OK to throw exceptions when something is wrong in the program logic. In
such a case, an exception is a clear sign that some code needs to be fixed.

Additionally, throwing exceptions is alright during the initialization. In
initialization requires connecting to some message bus and that connection
fails, it's an exceptional situation and the progrm should probably terminate.