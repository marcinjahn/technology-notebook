---
title: Hash Table and Set
description: Hash Table and Set
tags: ["algorithms"]
lang: en-US
---

# Hash Structures

## Hash Map

Other names: dictionary, hash map

They are really fast when looking up items.

- Lookup - O(1)
- Insert - O(1)
- Delete - O(1)

:::caution[O(n)]
In worst case scenario, all these operations run in O(n) when hash collision
occurs. However, that's a rare situtation, so we still consider all the above
operations to have O(1) complexity.
:::

The order of items in the hash map is "random" since it depends on the hashing
function used by the map and on the order in which we add the items.

## Set

Sets only have keys. They don't allow duplicate keys. The order of values is
undefined (depends from implementation).

## Hash Functions

Internally, hash would store items in some array. We need to calculate an index
where each item would go. First, we'd take the key and hash it. Then, we'd use
the module operation to get the index based on the hash.

The simplest function that returns index based on a provided key (being a
number):

```ts
getIndex(key: number): number {
    return item % 100;
}
```

The hash function in this case is `x -> x` - it just returns the input!

There will be only 100 hash values. That is useful if our hash map's internal
array has the capacity of 100.

If the item to hash was a string, we could turn it into numerical representation
first (e.g. by summing all chracters' encoding table indices).

Normally, we use more "established" hashing functions than the simple case
above.

### Collisions

The less hash vaues possible, the bigger possibility of having a collision when
hasing two different keys.

Solutions:

- **chaining** - store internal array's items in linked lists. Every index has a
  linked list (called a **bucket**). In case of a collision, the linked list
  under a colliding index will have another item appended. In such a case, time
  required to retrieve an item grows. Every node in a linked list stores the
  actual key value so during retrieval we can find the right key.
- **open addressing** - we store values directly in the internal array, without
  linked lists. When collision occurs while inserting, we have to look for
  another free spot (**probing**). Since every item is stored as a tuple (key
  and value), during the retrieval we can also use probing algorithms to find
  the right item.

#### Probing Algorithms

Below are a few examples of probing algorithms.
An algorith requires:

- the key
- the initial index where collision occured
- the interal array's capacity

##### Linear

It just selects the next index (circularly):

```csharp
public int GetNextIndex(int index, int arrayCapacity, int key)
{
    return (index + 1) % arrayCapacity;
}
```

The above solution has an issue of **Clustering**. It might occur that some part
of our array will become full of items, while other parts will be empty. Future
probings in the clustered area will be slow.


##### Quadratic

```csharp
public int GetNextIndex(int index, int arrayCapacity, int key)
{
    return (int)Math.Pow((index + 1), 2) % arrayCapacity;
}
```

It solved the clustering issue. However, with this approach we might end up
looping over the same indexes never finding a free spot, although it is there.

##### Double Hashing

It solves the clustering and the issue of never finidng a free spot of
quadratic method.

```csharp
private IProbingFunction _linearProbing = new LinearProbingFunction();

public int GetNextIndex(int index, int arrayCapacity, int key)
{
    var hash1 = _linearProbing.GetNextIndex(index, arrayCapacity, key);
    if (index == key)
    {
        var prime = PrimeNumberFinder.GetLowerPrime(key).Value;
        var hash2 = prime - key % prime;
        var result = (hash1 + index * hash2) % arrayCapacity;
        return result;
    }
    else
    {
        return hash1;
    }
}
```