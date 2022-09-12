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

## Installation

```sh
npm i @ngrx/store

```

## Building Blocks

NgRx exposes three main types of entities:

- store
- reducers
- actions

There is one store, but there are many actions and reducers:

- each entity type will have its own reducer (e.g. Products or Users will have their own reducers)
- each entity type will have 1 or more actions (e.g. Product will have
  AddProduct, UpdateProduct, while Users will have AddUser, RemoveUser, etc.)

### Actions

Actions are the atomic operations that we want to apply on our state. Things
such as adding, modifying, deleting data from our state is exposed via actions.
Each action is a separate class, with its own data. Additionally, each action
has its own `type`. That type is used to inform a reducer about the kind of
action that we want to execute.

Since actions are typically small, it's OK to keep them all in one file. Here's an example:

```ts
// action types
export const ADD_PRODUCT = 'ADD_INGREDIENT';
export const ADD_PRODUCTS = 'ADD_INGREDIENTS';

// actions
export class AddProduct implements Action {
  readonly type = ADD_INGREDIENT; // comes with the Action interface

  // optional data
  constructor(public payload: Product) {}
}

export class AddProducts implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Product[]) {}
}

// such a union type makes the reducer's code more succinct
export type ProductsActions = AddIngredient | AddIngredients;
```

Actions are **dispatched**, as we will see a bit later. Actions are a bit
similar to DTO objects. Some actor wants to do something with the store, so it
creates a new `Action` instance and dispatches it to the store (to be handled by
a reducer).

### Reducers

Reducers handle actions. A single reducer will handle all the actions of a
specific entity kind (like a Product).

Typically, reducer will be use a `switch-case`. Here's an example:

```ts
// a typical import grouping all actions under one object
import * as ProductsActions from "./products.actions";

// optional initial state
const initialState = {
  products: [
    new Product(1, 'Book'),
    new Ingredient(2, 'Steam Deck'),
  ]
}

// the actual reducer is a function
export function productsReducer(
  state = initialState, // reducer will be called by Angular on init with null state, so initialStae will jump in
  action: ProductsActions.ProductsActions // our union type
) {
  // handles each action
  switch(action.type) {
    case ProductsActions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload ]
      }
    case ProductsActions.ADD_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload]
      }
    default:
      // the initial call (invoked by Angular) will not have any action.type, we return the initialState here
      return state;
  }
}
```

::: warning State Modifications
Reducer should always return new object. Modifications of existing state are
forbidden.
:::

::: tip Union Type
TypeScript's union type that groups all the actions makes the type recognition
great with `switch-case` or `if-else`. The compiler automatically infers the
type of `action.payload` based on the `case` that we're currently in.
We don't need to manually cast anything.
:::