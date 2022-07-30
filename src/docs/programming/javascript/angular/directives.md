---
title: Directives
description: Directives in Angular SPA framework
tags: angular, spa, js, ts, directive
lang: en-US
---

# Directives

Directives are a way to kind of decorate HTML element with some additional
logic. Similarly to [Components](./components.md), they can be applied to element using:

- attributes (most often used)
- classes

For example, I could have this:

```html
<p appUnderline>Some paragraph</p>
```

It would apply the `UnderlineDirective` to the paragraph.

Directive is a TS class with a `@Directive` decorator applied to it.

There are also some built-in directives.

## Built-in Directives

### *ngIf

A conditional:

```html
<p *ngIf="userExists">Username is {{username}}</p>

<!-- With else: -->
<p *ngIf="userExists; else noUser">Username is {{username}}</p>
<ng-template #noUser>
    <p>User does not exist</p>
</ng-template>
```

The "else" syntax really sucks compared to Vue.js... It would be easier to use
another `*ngIf` with reversed condition.

::: tip Star
The star prefixing `ngIf` is an information that this directive is *structural*.
It changes the DOM (adds/removes an element).

**We can't have more than one structural directive on one element!**
:::

### ngStyle

It allows us to set styling of elements based on some condition:

```html
<p [ngStyle]="{ color: getColor() }">ABC</p>
```

The `getColor()` method would return some valid color string based on some
condition.

### ngClass

It's very similar to `ngStyle`, but it applies classes based on some logic.

```html
<p [ngClass]="{ highlighted: username === 'admin' }"
>
  {{username}}
</p>
```

The `.highlighted` CSS class will be applied to this paragraph only if it's an
admin.

### *ngFor

Iteration can be done with `*ngFor`:

```html
<p *ngFor="let text of texts">
  {{ text }}
</p>
```

We can also get the index of the iteration with:

```js
*ngFor="let text of texts; let i = index"
```

The `i` variable may be used within the loop now.

## Custom Directives

Some conventions:

- the file names for directive are usually in the format `{name}.directive.ts`.
- the `selector` is usually camelCase.

Here's a simple example:

```ts
@Directive({
  selector: '[appMyDirective]'
})
class MyDirective implements OnInit {
  
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit() {
    this.renderer.setStyle(elementRef.nativeElement, 'color', 'blue');
  }
}
```

Usage:

```html
<p appMyDirective>Some text</p>
```

The background of the paragraph will be blue.

::: warning Registration
Our directive has to be registered in a module, just like any component that we
create. Same as with component, we place the directives in the `declarations`
array.
:::

A few highlights:

- the `[appMyDirective]` selector is in square brackets, which means that the
  directive will be used as an attribute. If our selector was without the square
  brackets, it would be specifying an HTML element that this directive would be
  applied to (like `p`).
- the `elementRef` in the constructor is the element that the directive was
  applied to. It gets injected into the instance automatically by Angular. The
  name can be whatever we want, just the type needs to be `ElementRef`.
- it's a good idea to use [Renderer2](./tips.md#renderer2).
- we can do something with our element. `ngOnInit` lifecycle hook is a good
  place to do it.

::: tip Angular CLI
We can generate directives quickly with `ng g d <name>`.
:::