---
title: Resonsive Design
description: How to create responsive web
tags: css, html, web
lang: en-US
---

# {{ $frontmatter.title }}

::: tip
The webpages are responsive by default. As soon as we start to constrain sizes
of elements, the pages stop being responsive.
:::

## Units

**em** and **rem** are essential for responsive design. We do not use absolute
units, like `cm`, because their size is constant no matter the distance that we
look at the screen from. The desktop and phone display need different sizes of
elements due to that distance.

### em and rem

#### em

The unit applied on some element is in relation to:

- it's parent's `font-size` when dealing with `font-size`.
- it's own `font-size` when dealing with other properties (e.g. `margin`). It is
  useful, because the things like margin/padding usually should get bigger as
  the text of the element gets bigger (e.g. a button)

```html
<div style="font-size: 10px;">
    <div style="font-size: 2em; margin: 2em;">ABC</div> <!-- ABC in 20 px with a 40px margin -->
</div>
```

::: warning
**em** is in relation to either the parent's font size or to current element's
font size.
:::

Ems are compounding. If some parent element has `2em` size, and the child has
`2em` as well, the result will be that the parent will have 32px, and the child
will have 64px (assuming that it was the default, base size).

#### rem

**rem** is similar to em, but it's relative to the root element of the page
(`<html>`) instead of the parent.

::: warning
Opposed to **em**, **rem** is ALWAYS relative to the root.
:::

Rems are not compounding, they always relate to the root element, making it
easier to predict the outcome.

---

The em/rem are useful when using media queries. Especially rem allows us to
change the `font-size` of the `<html>` element and impact all the elements that
use rem predictably.

Ems, with their compounding characteristic, can get out of control, as the
elements might grow uncontrollably.

::: tip
Use **rem** for font-sizes. It's just easier to deal with.

Use **em** for `margin` and `padding`. Usually, it makes sense to scale
margins/paddings to the text of the content.
:::

### Viewport Units

The viewport units (**vh**, **vw**) act as a percentage of the browser window.
For example, the `100vh` will take up the whole height of the browser
(responsively). It is used on some pages where we scroll and discover different
sections, each one taking the `100vh`.

::: tip Viewport vs percentage
Viewport units are based on browser window size, while the percentage unit is
based on the HTML parent size.
:::

#### vmin and vmax

**vmin** and **vmax** work in a way that the final size is dictated by the hight
or width of the viewport. Whichever is smaller/bigger will be taken as a base.

For example, with `20vmin`, the size of the element will be 20% of the height of
the viewport, or width, depending on which one is smaller at the moment.
**vmax** works in an opposite way and is based on the greater size
(width/height) of the viewport.

It gives a good effect on titles, which will scale depending on the size of the
screen. It's not good for accessibility though.

## Tips

- it rarely makes sense to set `height` of elements. Noramlly, they should grow as
  needed.
- similarly, `min-width` should be rarely used.

## Sources

- [kevinpowell.co](https://kevinpowell.co):
    - [ems and rems](https://www.youtube.com/watch?v=_-aDOAMmDHI)
    - [ems not for
      font-size](https://www.youtube.com/watch?v=pautqDqa54I&t=239s)