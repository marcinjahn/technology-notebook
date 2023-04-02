---
title: Structs and Classes
description: Classes and Structs in C and C++
lang: en-US
tags: ["c", "programming", "c++", "class", "struct"]
---

# Structs and Classes

The C programming language has structs. C++ offers structs and classes.
Here's a bit of an overview of these constructs.

## C

C offers only structs. They are quite different from C++ structs, they are more limited.

Some key points:

- only data members can be used, no methods!
- no constructors or destructors
- no access modifiers, hence no encapsulation
- may be referred to by pointer only, no references

That's basically it, structs are a way to group related data (not functionality)
together.

## C++

C++ is an Object-Oriented Programming language (although it could be considered
multi-paradigm). It has both structs and classes. There is just one difference
between them:

> Structs have their members public by default, while classes have their members 
> private by default.

Other than that, structs and classes are pretty much the same.
Some features:

- they can hold data
- they can have methods
- they can have constructors/destructors
- they may be referred to by pointer or a reference
- they support access modifiers

You can find opinions that a `class` is supposed to be used to hold data
and functionality, while a `struct` is for related data, similarly to C.

Personally, I think that in the ideal world, there would be just one - either a
class or a struct. I think the only reason to have both is:

1. Structs, with their syntax would be kept compatible with C (assuming we don't
   use methods, and other non-C things) where everything is public.
2. Classes are supposed to be the "ideal" OOP construct, introduced for those
   who want to write new programs in an OOP style.