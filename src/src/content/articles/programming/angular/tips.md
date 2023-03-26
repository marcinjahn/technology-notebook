---
title: Tips
description: Some tips that are worth to know about Angular
tags: ["angular", "spa", "js", "ts"]
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
component's template. It would work the same way with a directive.
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

## Moving Events to Services

Normally, our components would emit events, and a parent of the component can
react to that. The problem appears when the component that wants to get some
event is not a direct parent of it. Then, we have to move the event up (and
sometimes down) the component tree to connect the two ends. It's cumbersome.

One solution is to:

- move the `EventEmitter<T>` to a service;
- replace that `EventEmitter<T>` with `Subject<T>` - it works pretty much the
  same, but is more functional (read [here](./observables.md#subject)).
  `EventEmitter<T>` would still work if for some reason we want to keep using
  that.

Then, both the even producer and consumer inject that service. The producer can
raise the event via the service:

```ts
this.someService.someEvent.next(someData);
```

The consumer(s) can subscribe to it:

```ts
const sub = this.someService.someEvent.subscribe((data) => {
    // do something...
});

// Rememember to unsubscribe
sub.unsubscribe();
```

::: warning
The problem with this approach is that now everyone who has access to
`someService` can produce/consume events.
:::

## Disabling a button for invalid forms

Here's an easy way to disable a button if a form is not valid:

```html{8}
    <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <input type="text" ngModel name="age">
        <input type="text">
        <select ngModel name="options">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
        </select>
        <button [disabled]="!f.valid" type="submit">Sumbit</button>
    </form>
```

## Environments

Angular has built-in support for switching config values between DEV and PROD
environments. Any app initialized by the CLI has the `src/environments`
directory where two files exist:

- `environment.ts` - for DEV
- `environemnt.prod.ts` - for PROD

During the build, Angular CLI will attach one of them to the bundle. When we
build with `ng build`, the PROD one will be used.

Inside of the environemnt files we can put all the config values we need. Then,
we import the `environment` object wherever we need to use these configs.

**What if there should be more envs than two?**

## References

[Renderer2 on
DigitalOcean](https://www.digitalocean.com/community/tutorials/angular-using-renderer2) 