---
title: TypeScript Tips
description: Some tips about TypeScript
tags: typescript
lang: en-US
---

# TypeScript Tips

## Typing

When creating types it's good to use interfaces instead of classes. Difference
is that interface is not going to be transpiled to JavaScript, which results in
a shorter JS code.

Example:

```js
export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

```