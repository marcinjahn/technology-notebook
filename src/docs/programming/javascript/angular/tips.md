---
title: Tips
description: Some tips that are worth to know about Angular
tags: angular, spa, js, ts
lang: en-US
---

# Angular Tips

## Global Styles

Other than adding styles to `src/styles.css`, we can also load any other CSS
files by listing them in the `angular.json` file. We should add them to the
`projects.{project-name}.architect.build.options.styles` array. This way, we can
apply Bootstrap or some other framework styling.

By the way, the forementioned `src/styles.css` is also listed there. That's how
it gets loaded.

## References to HTML Elements

We can mark any HTML element with a reference to be able to access it easily
from somewhere else.

::: tip Renderer2
It's recommened to use [Renderer2](#renderer2) instead of accessing the DOM
directly.
:::

Here's an example:

```html
<p #paragraph>Paragraph</p>

<button (click)="onClick(paragraph)">Click it</button>
```

We're able to pass a reference to a `<p>` element when clicking a button.

::: warning Only Template
This way, we can access references only from the template!
We can't access them from the TS code. Read on to learn how
to achieve the latter.
:::

### @ViewChild

Building on top the defined HTML element reference, we can add this to our
component's TypeScript code:

```ts
@ViewChild('paragraph') paragraph: ElementRef;

someMethod() {
    // to access the HTMLElement:
    const nativeElement = paragraph.nativeElement;
}
```

::: warning
If we're about to access the reference from `ngOnInit` [lifecycle
hook](./components.md#component-lifecycle), the `@ViewChild` decorator requires
the `{ static: true }` argument as well:

```ts
@ViewChild('paragraph', { static: true }) paragraph: ElementRef;
```

(Btw, why would we access DOM in `ngOnInit`? The elements are not initialized
yet...)
:::

::: tip
We can also access other components or directives this way with:

```ts
@ViewChild(SomeComponent) someComponent;
```

It will be a reference to the first usage of `SomeComponent` within the current
component's template.
:::

## Encapsulated Styles

Styles of comonents are encapsulated and they are applied ONLY to the component
to which the styles are attached. This is a cool feature that is missing from
Vue.js (Angular has to better at something!) By default, Angular does it in an
"Emulated" way by attaching custom attributes to HTML elements that belong to
the component and by modifying the styles' selectors to narrow down the scope of
the style. [There's also a way](https://angular.io/guide/view-encapsulation) to
do it via [Shadow
DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM),
but that's not supported by some of the browsers.

## Renderer2

It is recommended to use `Renderer2` to access DOM elements instead of doing it
via [references](#references-to-html-elements). This is safer in environments
such as Service Worker, server or mobile.

We can inject it into our classes and use as follows:

```ts
class SomeClass {
    @ViewChild('el') elRef: ElementRef; // or injected into the constructor in a directive

    constructor(private renderer: Renderer2) {}

    someMethod() {
        this.render.setStyle(elRef.nativeElement, 'color', 'white');
    }
}
```

## References

[Renderer2 on
DigitalOcean](https://www.digitalocean.com/community/tutorials/angular-using-renderer2)