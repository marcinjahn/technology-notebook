---
title: Tree
description: Trees
tags: algorithms
lang: en-US
---

# Trees

- **Dimension** - maximum amount of children a tree node can have (e.g. binary
  tree - max 2 children)
- **Height** of a node - amount of levels from the lowest leaf to that node.
- **Level** of a node - tree layers up to that node from the root. The root is
  at level 1.

## Binary Tree

A very popular kind of tree is a binary tree, where the dimension parameter
equals 2.

### Binary Search Tree

A binary tree where children with a lesser value are placed on the left, and the
children with greater or equal values are placed on the right.

This tree is well known for the **Binary Search** algorithm that can be applied
to it (and to sorted arrays).

Characteristics:

- the smallest value will be the leaf node on the far left
- the greatest value will be the leaf node on the far right
- the tree is **Balanced** when:
    - the right and left side of the root has rougly the same amount of nodes
    - the height of all leaves is rougly the same
- the **Unbalanced** tree, in the worst case scenario is like a linked list

#### Complexity

- **Insertion**: O(log n) (average); O(n) (worst case, when the tree is highly
unbalanced)
- **Traversal**: O(n)
- **Lookup**: O(log n) (average); O(n) (worst case, when the tree is highly
unbalanced)
- **Removal**: O(log n) (average); O(n) (worst case, when the tree is highly
unbalanced)

### Traversal

#### Pre-order

The parent first, then the children.

Use-cases:

- creating a copy of a tree (with exactly the same placement of nodes)

#### In-order

The left child is first, then the node, then the right child.

Use-cases:

- sorting elements in the increasing order (mush be search tree)

#### Post-order

The left and right children are first, then the parent node.

Use-cases:

- deleting all nodes of the tree (since we always deal with children first, then
  the parent)