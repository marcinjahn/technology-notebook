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

- we can do various arithmetic operations on pointers (e.g. `++` will result in
  the correct amount of bytes being added).
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
- allocating memory on the heap and keeping reference to it

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

## Usage

```c
int number = 10;
int *pointer;

pointer = &number; // address where value 10 is stored

// Dereferencing
int number_copy = *pointer; // returns value stored under the address that the pointer contains

*pointer = 20; //updates the value of the `number` variable
```

### Arrays

Array can be treated as a pointer to **the first element** that it contains.

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

#### Multi-dimensional Arrays

```c
int B[2][3];

int *p = B; // ERROR! B is a pointer to an array, not to an int
int (*p)[3] = B; // OK; 3 is needed, because pointer arithmetics needs to "know"
                 // how many bytes to add in operations like p++
```

![](./assets/multi-dimensional-arrays.png)

Pointer arithmetic examples:

- Printing `B` (or `&B[0]`) would return `400` (the address of the first
  sub-array)
- Printing `*B` (or `B[0]` or `&B[0][0]`) would return `400` (the address of the
  first element in the first sub-array)
- Printing `B+1` (or `&B[1]`) would return `412` (the address of the second
  sub-array)
- Printing `*(B+1)` (or `B[1]` or `&B[1][0]`) would return `412` (the address of
  the first element in the second sub-array)
- Printing `*(*B+1)` (or `B[0][1]`) would return `3`.
- `p++` would move from `400` to `412`

::: tip
`B` is an address of the first sub-array.
`*B` is an address of the first element of the first sub-array.
`**B` is the value of the first sub-array.
:::

::: tip 
In general, `array + i` moves us to the next element within the array. That way,
`B` being an array of arrays, `B + i` moves us to the next sub-array.
:::

#### Pointer to Pointer

```c
int x = 4;
int *p =  &a;
int **q = &p;
```

A `p` points to `x`. `q` points to `p`.

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

#### Arrays as arguments

When a function accepts an array as an argument, a pointer to an array is
passed:

![](./assets/array-in-argument.png)

This means that `sizeof(A)` will be different in `main()` (20 bytes) and in
`SumOfElements()` (4 bytes - just the size of a pointer to integer!).

::: tip 
`Function(int[] A)` is treated the same as `Function(int *A)`. A typical C
`main` function has both `char *argv` and `int argc` as arguments - a pointer to
arguments and a count of arguments.
:::

::: tip Multi-dimensional Arrays
A function that accepts a multi-dimensional array has to specify the count of
elements in sub-arrays.

Examples:

```c
void func(int *a) // size of int is known

void func2(int *a[2]) // an array of arrays that contain 2 elements

void func3(int *a[3][2]) // an array where each item is 3 arrays of 2 items each
```
:::

### Returning a pointer

It's wrong to return a pointer to a variable on a stack:

```c
int *Add(int a, int b)
{
  int c = a + b;
  return &c;
}

int main()
{
  int a = 1;
  int b = 2;
  int *p = Add(a, b); // we got a pointer to a sum
  SomeOtherFunction(); // the value that p points to could be overwritten by the new stack frame!
}
```

Instead, we should allocate the result on the [heap](./dynamic-memory.md) and
return a pointer to it.

## Function Pointers

```c
int Add(int a, int b)
{
  return a + b;
}

int main()
{
  int (*p)(int, int) = Add; // pointer definition contains return type and a list of parameters
  int c  = p(2, 3); // executes Add via a pointer - adds 2 and 3
}
```

A pointer `p` points to a function `Add`.

::: tip Ampersand and Start
Address of a function can be retrieved just by function's name (e.g. `Add`) or
with `&` (e.g. `&Add`).

We can invoke a function via a pointer just by using the pointer as if it was a
function (e.g. `p(2,3)`) or with a `*` (e.g. `(*p)(2, 3)`).
:::

## References

[https://www.youtube.com/watch?v=zuegQmMdy8M](https://www.youtube.com/watch?v=zuegQmMdy8M)