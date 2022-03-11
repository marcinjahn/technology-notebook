---
title: Linked List
description: Linked Lists
tags: algorithms
lang: en-US
---

# Linked List

A single node has the following data:

- value
- reference to a next node
- (optionally) reference to a previous node (**doubly-linked-list**)

A linked list itself has the following internal values:

- first node
- last node

## Runtime Complexity

- Lookup (by index) - O(n)
- Lookup (by value) - O(n)
- Insert - O(n)
    - In the beginning - O(1)
    - In the end - O(1)
    - In the middle - O(n)
- Delete - O(n)
    - In the beginning - O(1)
    - In the end - O(n) (unless we keep a reference to previous item, then we
      could go from last item to previous one and remove the last one)
    - In the middle - O(n)

## Two Pointers

Various Linked List problems can be solved by using the two pointers method.
This way, some problems can be solved in a single pass.

Examples of such problems:

- find *k*-th element from the end

    Normally, we'd do the following:

    1. Traverse the whole list to find out how many items we have (*n*)
    2. Traverse the list again to find the (*n - k*) item.

    Instead we can do the following: Traverse *k* items with the first pointer.
    Then, continue the traversal, but this time, the second pointer also starts
    the traversal (starting from the beginning). When the first pointer reaches
    the end, the second one will reach the *(n - k)* node.
- find the middle element of the list - with the two-pointers approach, during
    the traversal, first pointer moves one item at a time, while the second
    pointer moves two items at a time. When the second one reaches the end, the
    first one will be in the middle.

