---
title: System Calls and libc
description: Information about system calls in Linux
tags: ["linux", "syscalls", "system", "calls"]
lang: en-US
---

# System Calls

The boundary between user-space and kernel-space can be crossed using system
calls (aka *syscalls*). These are the functions that are supported by the
kernel. They can be split into some categories:

- filesystem management
- processes management
- other

For example, to execute a binary file, the `execve` syscall should be used.

We can see what system calls are invoked by any program by running `strace`. For
example, `strace ls` will show the system calls invoked by the `ls` program.

::: tip ptrace
`strace` uses a [ptrace](https://linux.die.net/man/2/ptrace) system call to work.
:::

## libc

System calls are not C functions. They don't use the call stack. Instead, we run
them via interrupts on CPU. We have to set an appropriate number in registers,
provide required arguments, and then we can invoke the interrupt. Linux kernel
registers handler for that interrupt and it is able to act on the system call.
That execution is the kernel-mode operation.

User-space programs can invoke system calls via abstraction provided by the
standard C library (like [glibc](https://www.gnu.org/software/libc/),
[musl](http://musl.libc.org/), or other). Such a library covers the whole
spectrum of syscalls that the kernel supports. 

We can see which libc functions are being used by a program by using `ltrace`. Example: `ltrace ls`.

::: tip syscall function
libc implementations have a function `syscall` which allows us to invoke the
syscall explicitly, without any additional "overhead". It could be useful if our
kernel supports some system call not covered by our version of libc.

An alternative would be to write the assembly code to invoke that system call.
:::

## References

- [Understanding system calls on Linux with strace (opensource.com)](https://opensource.com/article/19/10/strace#:~:text=A%20system%20call%20is%20a,processes%20and%20the%20Linux%20kernel.)
