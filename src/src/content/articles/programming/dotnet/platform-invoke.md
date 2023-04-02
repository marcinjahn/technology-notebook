---
title: Platform Invoke
description: Calling C code from other languages
lang: en-US
tags: ["c", "programming", "binding", ".net", "marshalling", "pinvoke"]
---

# Platform Invoke

C and C++ are/were often used for providing various code libraries. Examples include:

- GTK
- Cairo
- SVN

Sometimes we might want to use these libraries in our projects, but we don't
want to code in C/C++. This is where a technique called "Language Bindings"
comes into play. Many languages/runtimes offer a way to run dynamic libraries
even if they were compiled from different source languages. For example, in
.NET, we can use **Platform Invoke**. Here's an example:

```csharp
[DllImport (cairo, CallingConvention=CallingConvention.Cdecl)]
internal static extern void cairo_append_path (IntPtr cr, IntPtr path);
```

What Platform Invoke does is:

1. It loads the dynamic library (DLL on Windows) into the memory
2. It looks for the specified function
3. It arranges arguments of that function on the stack and executes it
4. It returns the result

::: tip Unmanaged Code
In the .NET world, it would be an example of Unmanaged Code, which is code
that runs outside the runtime.
:::

## Examples

Cairo is a good example of a library that is available only in C.
[CairoSharp](https://github.com/zwcloud/CairoSharp) is a language binding for
[Cairo](https://www.cairographics.org/bindings/) in .NET C#. It allows .NET
programmers to use Cairo in their projects. It has a
[NativeMethods](https://github.com/zwcloud/CairoSharp/blob/HEAD/source/CairoSharp/NativeMethods.cs)
class that exposes the C functions to the .NET world.

Another good example is [GtkSharp](https://github.com/GtkSharp/GtkSharp), which
is a .NET wrapper for GTK toolkit.

## Hosting .NET in native code

There is also a way for the reversed operation - running managed .NET code
withing a native C/C++ code. It's explained on
[MSDN](https://docs.microsoft.com/en-us/dotnet/core/tutorials/netcore-hosting).

## References

- [Interoperating with unmanaged code
(MSDN)](https://docs.microsoft.com/en-us/dotnet/framework/interop/)
- [Consuming Unmanaged DLL Functions
  (MSDN)](https://docs.microsoft.com/en-us/dotnet/framework/interop/consuming-unmanaged-dll-functions)