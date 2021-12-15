---
title: Advanced Vue.js Features
description: Use of advanced features of Vue.js
tags: javascript, vue
lang: en-US
---

# Advanced Vue.js Features

## Provide-Inject

We have 2 components, where one is an ancestor of the other (not necessarily a
direct one), and we want to share some data between them. Normally, we'd have to
share it using `props` going thorugh ALL the intermediate components, even if
they do not need this data - we're just passing it through.

We can use **provide-inject**. In the ancestor, we specify the `provide`
property, and put the data we want to share into it. Then, in the other
component, we use `inject` - it's an array where we specify the data we want to
be injected - and it needs to be provided by some ancestor!

We can provide some data from the `data` of our ancestor.

### Events

The same way we can share the events. Instead of passing the event through all
the components in the middle, we can **provide** the handler, and **inject** it
into the component that would normally emit the event. Insted of emiting it, it
will invoke the handler.

## Teleport

Sometimes we'd like our components to display something in a different place in
the HTML structure. I.e., a notification.

Before:

```vue
<template>
    <input type="text"/>
    <button>Submit</button>
    
    <div v-if="isError">
        The provided data is wrong!
    </div>
</template>
```

After:

```vue
<template>
    <input type="text"/>
    <button>Submit</button>
    
    <teleport to="#notifications">
        <div v-if="isError">
            The provided data is wrong!
        </div>
    </teleport>
</template>
```

The `<teleport>` component renders its content in the selected element (selected
by `to`). In this case, the `div` will be rendered inside of an element with id
"notifications".

## Routing

The parameters of a route can be given as props. To do that, the route needs to
have this option enabled, i.e.:

```vue
{ path: '/teams/:teamId', component: TeamMembers, props: true }
```

This way, the component does not need to rely on `this.$router` for reading
parameters. Instead, it can use the `props` as usually.

## Transition

Vue incldes a `Transition` component, which helps with animations when
entering/leaving the DOM (`v-if` or `v-show`). It applies CSS classes as the
element appears in DOM, and another set of classes as the element disappears.
Other than that it applies a delay to `v-if` so that the element does not
disappear right away, but rather only after an animation finishes execution.

Example:

```vue
<template>
    <transition>
      <p v-if="paraIsVisible">This paragraph is only sometimes visible</p>
    </transition>
</template>

<style>
<!-- Applied when element appears -->
.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

<!-- Applied throughout the entire enter animation -->
.v-enter-active {
  transition: all 0.3s ease-out;
}

<!-- Applied at the end of the enter animation -->
.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}



<!-- Applied when element start to leave -->
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

<!-- Applied throughout the entire leave animation -->
.v-leave-active {
  transition: all 0.3s ease-in;
}

<!-- Applied at the end of the leave animation -->
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

```

It is especially useful for the LEAVE animation, because it is not possible to
do with CSS alone. Normally, `v-if` would cause the element to disappear right
away. With transition, it does it after animation ends. Vue analyzes the classes
above to figure out the duration of the animation.

If the animated element does not appear/leave the DOM, CSS alone is enough.

The names of the classes can be fully customized.

### Two elements

`transition` should contain just one element in its slot. There is one exception
- we can have two elements, but ONLY if we can guarantee that at any given time
only one of them is in the DOM. Example:

```vue
<transition>
    <button v-if="!usersAreVisible">Show Users</button>
    <button v-else>Hide Users</button>
</transition>
```

Only one button may be displayed depending on the value of `usersAreVisible`.

The ordr of animations may be controlled with `mode`. It can be either `in-out`
(firs elemnt appears, then the other disappears), or the opposite with `out-in`.
Without specifying mode, they transition at the same time.

For multiple items, like lists, there is a `transition-group` component.

### Animation parameter

Instead of using all three classes (`from`, `active`, `to`), we can also use
just the `active` and utilize `animation` based on `keyframes`.

### Events

The `transition` component emits events during various stages of the transition,
i.e. `@before-enter`. They are useful for controlling animations with JS instead
of CSS. If we want to use only JS, we can disable the CSS classes stuff with
`:css="false"` setting on the `transition` component.