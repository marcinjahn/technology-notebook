---
title: Records
description: Using Records in .NET C#
tags: .net, asp.net
lang: en-US
---

# Records

Records can be stored on a heap or a stack:

```csharp
// heap, like a class
record Person(string Name);

// stack, like a struct
record struct Person2(string Name);
```

Depending on the choice as above, the compiler will transform the
record into either a class or a struct (in a process called the *lowering*).
Record is just s "sugar syntax" in .NET.

Records are useful when we're dealing with classes that just carry information
and do not have any logic/methods.

## Features

### Printing

Printing an instance of a record by default prints its content. An instance of a
class would print its type.

```csharp
Console.WriteLine(recordInstance); // Person { Name = "Marcin" }

Console.WriteLine(classInstance); // Namespace.ClassName
```

Records printing behavior may be overridden just like in a normal class.

### Equality

Class instances (unless explicitly coded otherwise) will not be equal even if
all properties have the same values. Equality is checked by reference.

In the case of records, an equality check compares the values of the properties.

### The `with` operator

Records may be copied (by value) with some changes to original values like this:

```csharp
var rec1 = new Person("Marcin", 25);
var rec2 = rec1 with { Age = 20 }; // only age gets modified in the new record instance 
```

::: tip Anonymous Types
The `with` operator can also be applied to anonymous types in C#.
:::

### Deconstructing

A bit similarly to JS, we can extract some values from records:

```csharp
(var name, var age) = rec1;
```

::: tip
To support deconstructing, the compiler generates the `Deconstruct` method for a
record during the lowering process of compilation.
:::

