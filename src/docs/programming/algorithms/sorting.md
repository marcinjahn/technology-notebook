---
title: Sorting
description: Sorting of arrays
tags: algorithms, sort
lang: en-US
---

# Sorting

## Bubble Sort

- **Time Complexity: O(n^2)**
- **Space Complexity: O(1)**

```csharp
static void BubbleSort(IList<int> nums)
{
  var swapped = false;

  do
  {
    swapped = false;
    for (var i = 0; i < nums.Count() - 1; i++)
    {
      if (nums[i] > nums[i + 1])
      {
        Swap(nums, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);
}

static void Swap(IList<int> nums, int i1, int i2)
{
  var temp = nums[i1];
  nums[i1] = nums[i2];
  nums[i2] = temp;
}
```

## Insertion Sort

- **Time Complexity: O(n^2)**
- **Space Complexity: O(1)**

Similar to Bubble Sort, but:

- does only 1 pass through the array
- places items in the right spots directly instead of moving them 1 field at a
  time

It's slow, but it comes useful when:

- the dataset is almost sorted
- we're sorting a stream of incoming data

```csharp
static void InsertionSort(IList<int> nums)
{
  for (var i = 0; i < nums.Count() - 1; i++)
  {
    if (nums[i] > nums[i + 1])
    {
      var insertionIndex = FindInsertionIndex(nums, i + 1);
      MoveAndInsert(nums, i + 1, insertionIndex);
    }
  }
}

static int FindInsertionIndex(IList<int> nums, int index)
{
  for (var i = index - 2; i >= 0; i--)
  {
    if (nums[i] <= nums[index]) {
      return i + 1;
    }
  }
  return 0;
}

static void MoveAndInsert(IList<int> nums, int sourceIndex, int targetIndex) 
{
  var temp = nums[sourceIndex];

  for (var i = sourceIndex; i > targetIndex; i--)
  {
    nums[i] = nums[i - 1];
  }

  nums[targetIndex] = temp;
}
```

## Merge Sort

- **Time Complexity: O(log(n))**
- **Space Complexity: O(n)**

It uses the divide-and-conquer approach. We split the array to single-element
arrays and then join them together, sorting in the process.

```csharp
static void MergeSort(IList<int> nums)
{
  if (nums.Count() <= 1) return;

  var halfIndex = nums.Count() / 2;
  var l = nums.Take(halfIndex).ToArray();
  var r = nums.Skip(halfIndex).ToArray();

  MergeSort(l);
  MergeSort(r);

  var i = 0;
  var j = 0;
  var k = 0;

  while (i < l.Length || j < r.Length) 
  {
    if (i < l.Length && j < r.Length) {
      if (l[i] < r[j]) 
      {
        nums[k++] = l[i++];
      } else {
        nums[k++] = r[j++];
      }
    }
    else if (i < l.Length) {
      nums[k++] = l[i++];
    }
    else if (j < r.Length) {
      nums[k++] = r[j++];
    }
  }
}
```

## Resources

[https://www.programiz.com/dsa/merge-sort](https://www.programiz.com/dsa/merge-sort)