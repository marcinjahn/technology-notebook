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

Similar to Bubble Sort, but:

- does only 1 pass through the array
- places items in the right spots directly instead of moving them 1 field at a
  time

It's slow, but it comes useful when:

- the dataset is almost sorted
- we're sorting a stream of incoming data

- **Time Complexity: O(n^2)**
- **Space Complexity: O(1)**

```csharp
void InsertionSort(int[] numbers)
{
  for (var i = 0; i < numbers.Length - 1; i++)
  {
    if (numbers[i] > numbers[i + 1])
    {
      var index = FindInsertionIndex(numbers, i + 1);
      Insert(numbers, i + 1, index);
    }
  }

  int FindInsertionIndex(int[] numbers, int sourceIndex)
  {
    for (var i = 0; i < sourceIndex; i++)
    {
      if (numbers[i] > numbers[sourceIndex]) return i;
    }
    return 0;
  }

  void Insert(int[] numbers, int originalIndex, int targetIndex)
  {
    if (originalIndex == targetIndex) return;

    var temp = numbers[originalIndex];
    for (var i = originalIndex; i > targetIndex; i--)
    {
      numbers[i] = numbers[i - 1];
    }
    numbers[targetIndex] = temp;
  }
}
```

## Merge Sort

It uses the divide-and-conquer approach. We split the array to single-element
arrays and then join them together, sorting in the process.

- **Time Complexity: O(n log(n))**
- **Space Complexity: O(n)**

```csharp
void MergeSort(int[] numbers)
{
  if (numbers.Length <= 1) return;

  var partitionIndex = numbers.Length / 2;

  var arr1 = numbers.Take(partitionIndex).ToArray();
  var arr2 = numbers.Skip(partitionIndex).ToArray();

  MergeSort(arr1);
  MergeSort(arr2);

  var i = 0;
  var j = 0;
  var index = 0;

  while (index < numbers.Length)
  {
    if (i == arr1.Length || arr2[j] < arr1[i])
    {
      numbers[index++] = arr2[j++];
    }
    else if (j == arr2.Length || arr1[i] < arr2[j])
    {
      numbers[index++] = arr1[i++];
    }
  }
}
```

## Quicksort

It's a recursive algorithm where we select pivot point and move elements around
the pivot in a way that elements less than pivot are on the right, and
elements that are greater are on the right. Then, we do the same in the two
partitions that the pivot created.

It's a divide-and-conquer technique.

There are different strategies when it comes to selecting the pivot point. It
could be:

- first element
- last element
- random element
- something else

::: tip Popularity
It's the default sorting algorithm in many programming languages (including
.NET).
:::

- **Time Complexity: O(n log n)** (worst case: O(n^2) - when the picked pivot
  is the smallest or the greatest element)
- **Space Complexity: O(log n)**

```csharp
static void QuickSort(IList<int> nums)
{
  QuickSortInternal(nums, 0, nums.Count() - 1);
}

static async void QuickSortInternal(IList<int> nums, int startIndex, int endIndex)
{
  if (startIndex >= endIndex) return;

  var pivotIndex = endIndex;

  var tempIndex = -1; // it will point to elements greater than pivot
  for (var i = startIndex; i < pivotIndex; i++)
  {
    if (nums[i] < nums[pivotIndex] && tempIndex != -1)
    {
      Swap(nums, i, tempIndex);
      tempIndex++;
    }
    else if (nums[i] > nums[pivotIndex] && tempIndex == -1)
    {
      tempIndex = i;
    }
  }

  if (tempIndex != -1)
  {
    Swap(nums, pivotIndex, tempIndex);
    pivotIndex = tempIndex;
  }

  QuickSortInternal(nums, startIndex, pivotIndex - 1);
  QuickSortInternal(nums, pivotIndex + 1, endIndex);
}

static void Swap(IList<int> nums, int i1, int i2)
{
  var temp = nums[i1];
  nums[i1] = nums[i2];
  nums[i2] = temp;
}
```

::: tip Pivot
In the code, I assumed that the `pivotIndex` is always the last element of the
sub-array being sorted. Because of that, the loop does not take into account
values on the right side of the pivot (since there are none). A diffeerent
choice of pivot point would require modifying the loop (there could be two
loops, for the left and the right side).
:::

## Resources

[https://www.programiz.com/dsa/merge-sort](https://www.programiz.com/dsa/merge-sort)