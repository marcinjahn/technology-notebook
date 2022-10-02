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
npm i @ngrx/store # Core
npm i @ngrx/effects # Side-effects
```

## (Some) Building Blocks

NgRx exposes three main types of entities:

- store
- reducers
- actions

There are also [effects](#side-effects), but they come as part of separate
package.

There is one store, but there are many actions and reducers:

- each entity type will have its own reducer (e.g. Products or Users will have
  their own reducers)
- each entity type will have 1 or more actions (e.g. Product will have
  AddProduct, UpdateProduct, while Users will have AddUser, RemoveUser, etc.)
- each feature section of our app will have its own `store` directory where the
  reducer and actions files will be kept

### Actions

Actions are the atomic operations that we want to apply on our state. Things
such as adding, modifying, deleting data from our state is exposed via actions.
Each action is a separate class, with its own data. Additionally, each action
has its own `type`. That type is used to inform a reducer about the kind of
action that we want to execute.

Since actions are typically small, it's OK to keep them all in one file. Here's
an example:

```ts
// action types - there's a convention of prefixing string with the name of feature
// in square brackets to avoid potential conflicts with other features
export const ADD_PRODUCT = '[Products Catalog] Add Product';
export const ADD_PRODUCTS = '[Products Catalog] Add Products';

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

Reducers handle actions in the context of the store. A single reducer will
handle all the actions of a specific entity kind (like a Product). The store in
our app is built with the help of reducers!

Reducer is a function that is invoked anytime some action is dispatched (and at
the bootstrap of our app!). It receives two parameters:

- the current state (or an initial state if we set it up this way)
- the action (with its optional payload)

And, it returns the new state.

Typically, a reducer will use a `switch-case` statement. Here's an example:

```ts
// a typical import grouping all actions under one object
import * as ProductsCatalogActions from "./products.actions";

// a type of ProductsCatalog state.
export interface State {
  products: Product[];
  selectedProduct?: Product
}

// optional initial state
const initialState: State = {
  products: [
    new Product(1, 'Book'),
    new Ingredient(2, 'Steam Deck'),
  ],
  selectedProduct: null
}

// the actual reducer is a function
export function productsCatalogReducer(
  state: State = initialState, // reducer will be called by Angular on init with null state, so initialStae will jump in
  action: ProductsCatalogActions.ProductsActions // our action union type
) {
  // handles each action
  switch(action.type) {
    case ProductsActions.ADD_PRODUCT:
      return {
        ...state, // a typicl pattern of copying the rest of the previous state
        products: [...state.products, action.payload ] // products field of the state gets replaced
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

::: tip Invocation
Reducers are not invoked by our app components directly. Instead, it is handled by
NgRx when we [dispatch some action](#dispatch) or on init (with action type set
to *@ngrx/store/init*).
:::

::: warning State Modifications 
Reducer should always return new object(s). Modifications of existing state are
forbidden!
:::

::: tip Union Type
TypeScript's union type that groups all the actions makes the type recognition
great with `switch-case` or `if-else`. The compiler automatically infers the
type of `action.payload` based on the `case` that we're currently in.
We don't need to manually cast anything.
:::

It's important to mention that reducers are very limited in what they actually
do. They should first of all take care of the store. They should not interact
with the ourside world. Things such as network requests, accessing storage, etc.
- these should be left to [effects](#side-effects).

### Store Type

We probably are going to have a few kinds of data and a few reducers. It makes
sense to define a global type that defines all kinds of data being stored:

```ts
// naming convention for imports
import * as fromproductsCatalog from "../products/store/products-catalog.reducer";
import * as fromAuth from "../auth/store/auth.reducer";

export interface AppState {
  productsCatalog: fromProductsCatalog.State, // stores stuff related to products catalog
  auth: fromAuth.State // stores auth data (like currently logged-in user)
}
```

With such a type, it's easier to inject the store into classes. Since the
`AppState` type is global within our app, it makes sense to put it in its own
file called `app.reducer.ts`, in the `/app/store/` directory.

In the same file, we can also put the listing of all the reducers within our app:

```ts
export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
```

It will come useful very quickly.

## Using the Store

### Register

First of all, our store needs to be imported in some module:

```ts
import * as fromApp from "./store/app.reducer"; // again, import convention

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(fromApp.appReducer), // appReducer is our reducers map
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

This is the place where we inform the framework of any reducers that we have
defined. In the end, the reducers build up the store in the app.

### Inject

Our components or services may inject the `Store` in order to access
its data:

```ts{4}
import * as fromApp from "../store/app.reducer";

constructor(
  private store: Store<fromApp.AppState>
) { }
```

The `Store<>` is a generic type. Thanks to [Store Type](#store-type) being
defined as an interface, we can quickly specify our store.

### Use

#### Dispatch

We can dispatch actions like this:

```ts
this.store.dispatch(new ProductsCatalogActions.AddProduct(product));
```

That dispatch will go through NgRx's internals, which will invoke our reducer.
Based on the action (`AddProduct`) it will update the store with the new
`product`.

::: warning 
Whenever we dispatch some action, it's not just the corresponding reducer that
gets invoked. All the reducers get invoked! Only one of them will have proper
handler for the supplied action type, other reducers will just execute their
"default" case.
:::

#### Subscribe

Store's data is exposed via `Observable`s:

```ts
products$: Observable<{ products: products[] }>;

...

this.products$ = this.store.select('productsCatalog');
```

Any `dispatch` that "modifies" the store, would bring data via the subscription.

::: warning Unsibscribe
Like with any subscription, we need to rememebr to `unsubscribe` on destroy.
:::

## Side Effects

([@ngrx/effects](https://www.npmjs.com/package/@ngrx/effects)) is an additional
package for NgRx that adds **Side Effects**. Until now we had some actions
defined, and reducers that acted on them. Reducers focused on state
"modifications". They should not contain any logic other than that.

However, our state actions are often associated with some additional logic that
we need to execute - sending some network request, storing some data in local
storage, etc. This is what effects are for.

Each feature in our app can have its own `store/*.effects.ts` file. Here's an
example:

```ts
@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions, 
    private httpClient: HttpClient, 
    private store: Store<fromApp.AppState>) {
  }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => this.httpClient.get<Recipe[]>("https://my-api.com")),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      })
    }),
    map(recipes => new SetRecipes(recipes)));

  @Effect()
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([_, { recipes }]) => {
      return this.httpClient.put("https://angular-max-tutorial-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
        recipes)
    })
  )
}
```

Effects for a given domain is a class with properties representing different
effects.

Effects typically return observable of NgRx actions. That's because
effect is a kind of an in-between step that happens when we invoke some action.
Example of that could be an effect that:

1. Listens for the *[Auth] Login Start* actions
2. Wehever such action comes in, it sends a login request to some authentication server
3. When the response comes back, it either issues *[Auth] Logic Success* or *[Auth] Login Fail* action.
4. The reducer sets up the state properly for all 3 kinds of actions mentioned above.
5. Some UI component subscribes to state changes and reacts properly to each
   state change.

In some cases though, effects do not emit any actions. Instead, an effect
could use a [Router](./routing.md) to redirect the user somewhere else.
To do that, the `Effect` decorator needs to be provided with an argument:

```ts
@Effect({ dispatch: false })
```

### Accessing State

Accessing state within an action is possible with the `withLatestFrom`
[RxJs](./observables.md) operator. It joins the original observable with data from 
some another observable (like some state selector).

The `storeRecipes` effect from up above made use of that operator.

## Extra Packages

### Redux Dev Tools

[Redux Dev Tools](https://github.com/reduxjs/redux-devtools) is a browser extension (or standalone app) that is similar to browser DevTools. It requires the app to be extended with DevTools module, which is not ideal, but allows us to see in detail what happens with the store:

- actions being emited
- shape of the store after each action
- and more...

### Router Store

An offical package from NgRx
[@ngrx/router-store](https://www.npmjs.com/package/@ngrx/router-store) is an
addition that emits [actions](#actions) based on [Router](./routing.md)'s
activity. Whenever some navigation happens, etc., a specific action type is
emitted with some payload, allowing us to react to it in our actions or
reducers. 