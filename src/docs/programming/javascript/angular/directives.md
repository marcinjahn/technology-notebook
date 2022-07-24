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
The star prefixing `ngIf` is an information that this directive is *structural*
- it changes the DOM (adds/removes an element).
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