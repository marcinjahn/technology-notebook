---
title: NgRx
description: Application state management in Angular with NgRx
tags: angular, spa, ngrx, redux, state, reducer
lang: en-US
---

# NgRx

NgRx is a framework for managing application state. Without it, our apps would
typically:

- manage app state via services;
- services would be accessed from various components;
- there would be no control over state mutations.

NgRx is an Angular version of Redux - React's state management framework. It
makes use of RxJS making the state observable.

::: tip
NgRx is an overkill for smaller applications.
:::


