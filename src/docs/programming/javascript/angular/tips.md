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