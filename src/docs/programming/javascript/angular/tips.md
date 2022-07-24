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