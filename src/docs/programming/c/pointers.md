---
title: Pointers
description: Pointers in the C programming language
lang: en-US
---

# Pointers

A pointer is a variable whose value is the address of some value.

The declaration looks as follows:

```c
float *my_pointer
```

The pointer is defined with the type of the value that it points to. This is
helpful, because:

- we can do various arithmetic operations on pointers (e.g. `++`) will result in
  the correct amount of bytes being added.
- we can dereference pointers - the runtime needs to know how many bytes a given
  pointer points to and how to interpret them (e.g. `int` and `float` both take
  4 bytes, but the same contents mean different values)

The "star" sign may be placed adjacent to the type or to the name, or to both:

```c
int *pointer;
int* pointer2;
int*pointer3;
```

## Use-cases

Pointers are useful for:

- passing data to functions by reference (e.g. `void increment(int *number)`)

## Memory

Memory is organized as follows:

![](./assets/memory.png)

Each slot is addressed.

A pointer stores an address to some value in memory:

![](./assets/pointer-in-memory.png)

Pointer itself also has an address in memory, it also is some variable.
In the case above, `&p` is `64`.

### Variables

When we define some variable, it will be assigned some address in memory. If we
try to print the value under that address, we will find some "random" data:

```c
int variable;
int *pointer = &variable;
printf("%d", *pointer); // 0 or some other trash value

```

## Operations

```c
int number = 10;
int *pointer;

pointer = &number; // address where value 10 is stored

// Dereferencing
int number_copy = *pointer; // returns value stored under the address that the pointer contains

*pointer = 20; //updates the value of the `number` variable
```

## Arrays

Array can be treated as a pointer to the first element that it contains.

```c
int array[] = {1, 2, 3};

int *pointer = array; // same as &array[0]

printf("Address of array[0] = %x\n", pointer);
printf("Value of array[0] = %x\n", *pointer);

pointer++;

printf("Address of array[1] = %x\n", pointer);
printf("Value of array[1] = %x\n", *pointer);
```

Simply:

- address: `&array[i]` = `array + i` = `pointer + i`;
- value: `array[i]` = `*(array + i)` = `*(pointer + i)`

::: danger Array and pointer are not the same thing
An array variable cannot have its value set to some pointer!

```c
array = pointer; //wrong!
```

Therefore array variable is not the same as pointer.
:::

### Arrays as arguments

When a function accepts an array as an argument, a pointer to an array is
passed:

![](./assets/array-in-argument.png)

This means that `sizeof(A)` will be different in `main()` (20 bytes) and in
`SumOfElements()` (4 bytes - just the size of a pointer to integer!).

::: tip 
`Function(int[] A)` is treated the same as `Function(int *A)`. That's
why the typical C `main` function has both `argv` and `argc` as arguments.
:::

## Pointer to a Pointer

```c
int x = 4;
int *p =  &a;
int **q = &p;
```

A `pointer` points to `a`. `pointer2` points to `pointer`.

![](./assets/pointer-to-pointer.png)

In this exmple we have even `int ***` pointer (a pointer to pointer to pointer).

We can also dereference such "deep" pointers. For example:

```c
printf("%d", **q); // prints 6
```

::: tip Arrays
Pointers to pointers are analogical to multi-dimensional arrays. `int **pointer`
is analogical to `int array[][]`. `pointer` points to a pointer that points to
the first element of the inner array.

In general, replacing `*` with `[]` is a helpful mental technique in
understanding pointers.

`int (*p)[];` - it is analogical to `int **p;`
:::

## References

[https://www.youtube.com/watch?v=zuegQmMdy8M](https://www.youtube.com/watch?v=zuegQmMdy8M)