---
title: CSS Tricks
description: Some info on CSS
tags: css, html, web
lang: en-US
---

# CSS tricks

## Resources

Generally about CSS layouts: https://www.smashingmagazine.com/2018/05/guide-css-layout/

## Border-box setting

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

## BEM

Naming CSS classes is hard. Especially in bigger projects. There are some CSS
naming systems. [BEM](http://getbem.com/introduction/) is one of them and it's
quite simple. It focuses on defining:

- Blocks - something that can exist on its own (e.g., hero)
- Elements - something that is dependent on a containin block (e.g., hero__text)
- Modifiers - variation of something (e.g. btn--success)

Here's a [YT video](https://www.youtube.com/watch?v=SLjHSVwXYq4) about it.

## SASS

A good CSS preprocessor to use is [SASS](https://sass-lang.com/).
