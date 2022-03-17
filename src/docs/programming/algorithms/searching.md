---
title: Searching
description: Searching through collections (arrays, strings)
tags: algorithms
lang: en-US
---

# Searching

## Boyer-Moore-Horspool

It's an algorithm for searching for a substring withing a string. It uses a
**Bad Match Table** to store characters of the pattern we're searching for (a
hashmap). Each character is a key, and the value is the shift from the end of
the pattern where the given character can be found. While iterating through
source string's character's, we're looking for the last character of the
pattern. If we find it, we try to match the rest of the characters. If we find
any other character of the pattern, we try to shift the search window to match
the postion of the found character with the positon of it in the pattern.

An example of a Bad Match Table for the word "ROOM":

|CHARACTER|SHIFT|
|-|-|
|R|3|
|O|1|
|M|?|

- the "M" character is a bit special - it should be kept outside of the hash map
for ease of access since we're using it all the time in the loop for matching.
In the code below I'm just using `pattern[length - 1]` to access the last
character.
- the "R" is on the 3rd index from the right (so, if we find character "R", we
know that we need to shift our search window 3 characters to the right).
- the "O" character is there only once. Since keys in a hashmap cannot repeat,
  we keep only the instance that is positioned the most to the right.

- **Time Complexity: O(mn)** (average - O(n))


```csharp
public record Match(int Index, int Length);

static IEnumerable<Match> BoyerMooreHorspool(string input, string pattern) 
{
  var length = pattern.Length;

  var table = new Dictionary<char, int>();
  for (int i = 0; i < length - 1; i++)
  {
    if (table.ContainsKey(pattern[i])) {
      table[pattern[i]] = length - i - 1;
    }
    else
    {
      table.Add(pattern[i], length - i - 1);
    }
  }

  var matches = new List<Match>();

  var index = length - 1;
  while (index < input.Length)
  {
    // last character matchees
    if (input[index] == pattern[length - 1])
    {
      var i = 1;
      while (i < length)
      {
        if (pattern[length - 1 - i] != input[index - i])
        {
          break;
        }
        i++;
      }

      if (i == length)
      {
        matches.Add(new Match(index - length + 1, length));
      }
      index += length;
    }
    // some other character matches
    else if(table.ContainsKey(input[index]))
    {
      index += table[input[index]];
    }
    // nothing matches
    else
    {
      index += length;
    }
  }

  return matches;
}
```

The algorithm is efficient, because it skips groups of characters in the input
string that have no chance of being a part of the pattern.