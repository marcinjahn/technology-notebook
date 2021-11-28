---
tags: css, html, web
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