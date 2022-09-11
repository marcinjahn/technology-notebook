---
title: Modules
description: Organizing code with modules in Angular SPA framework
tags: angular, spa, js, ts, modules, organization
lang: en-US
---

# Modules in Angular

Modules are a way of bundling various Angular entities together:

- components,
- directives,
- services,
- pipes.

A proper organization of code between modules results in:

- feature separation
- better performance (when lazy loading is used)

Angular itself bundles its various parts into modules. Here are some examples:

- `RouterModule`
- `FormsModule`
- `BrowserModule` and `CommonModule` - things like `ngFor` or `ngIf` directives
  are there!
- `HttpClientModule` - it only provides services

## ngModule Decorator

The `NgModule` decorator has the following options:

- **declarations** - here, we register all the **components**, **directives**, and
  **pipes**.

  ::: warning
  A single entity may only be declared once! Two or more modules can't declare the same thing.
  :::

- **imports** - here, we pull in other modules (or other things if [Standalone Components](./standalone-components.md) are being used), either provided by external
  parties (e.g. Angular itself) or our own modules.
- **exports** - a way to expose some entities to the other modules (those that
  will import the current module). E.g., if I export `RouterModule` from
  `SomeModule`, any module that imports `SomeModule` may use `RouterModule`'s
  features (e.g., its directives). We can export imports and
  declarations: modules, components, directives, pipes. Export only those
  entities that you want to be usable in entities (like components) declared in
  other modules.
- **providers** - Dependency Injection setup. Alternatively, services can
  configure their injection via the `Injectable` decorator and its `providedIn`
  property.
- **bootstrap** - defines the starting component(s) (usually `AppComponent`)
- **entryComponents** - *deprecated*, it was used for [dynamic
  modules](./components.md#instantiating-components-from-typescript) in the
  past.

## Organizing Code into Modules

A recommended way of organizing code in larger applications is to split code
into modules by feature. E.g., we could have a set of components that are all
about the products domain. Also, we could have another set of components that
are all about managing orders. In this idealized scenario, we'd put
products-related components into one module, and the orders-related stuff into
another module.

Another case would be to group together some shared components that are used
throughout different domains into their own module.

### Scope

The entities declared in a module (e.g. components) have access ONLY to entities
that this module declares or imports (services are an exception, more on that
[later](#dependency-injection)). For example, if I create a `MyModule` module
with some declared component, I can use `routerLink` in that component only if I
import `RouterModule` into `MyModule` first. **I think this rule applies only to
templates and the components, directives or pipes that we use within them (?)**

It's important to note that we can import the same module multiple times into
different components. For example, if both `AppModule` and `MyModule` have
some declared components that make use of `<ng-outlet>`, we should import
`RouterModule` into both of them.

::: tip Services
The `HttpClientModule` is a bit "special". Since it does not expose anything
other than services (provides them), it does not need to be imported into every
module that needs `HttpClient`. Services can be injected without that.
:::

::: warning BrowserModule
The `BrowserModule` is even more "special". It should be imported only once into
the `AppModule` and nowhere else. Since features like `ngIf` and `ngFor` come
from that module, that would be a bit limiting. Because of that, the other
modules that want to make use of these features, should import the
`CommonModule`. `ngIf` and other stuff will become available.
:::

## Routes

Our feature modules representing different sections of the app could also handle
their routes. We could go even further and create separate routes modules per
feature. Each feature would have such a module with its specific routes.

Here's an example of such a module:

```ts
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [ AuthorizationGuard ],
    children: [
      { path: '', component: ProductsListComponent, pathMatch: 'full' },
      { path: 'new', component: NewProductComponent},
      { path: ':id', component: ProductInfoComponent, resolve: [ PoductResolverService ] },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
```

::: tip forChild
In the main `AppRoutingModule` we usually use `RouterModule.forRoot()` method. In
these feature-specific route modules, we use `RouterModule.forChild`. In the
end, all these routes will be merged together. `forChild` is also needed to
enable [lazy loading](#lazy-loading)!
:::

Note that even though in this routing module we reference some components, we
don't need to import them via the `imports` array. We need to import stuff only
if we plan to use it in the templates.

## Lazy Loading

Until now, we've been discussing **Eager-loaded Modules**. They are loaded on
bootstrap together with the `AppModule`. With proper module organization we can
make use of **lazy loading**. 

With eager-loaded modules, when the user visits our website, all of our code is
being downloaded by their browser at once. For smaller applications, it's not a
big deal. For bigger apps though, it surely is something worth optimizing. With
lazy loading, the code is being downloaded as it's needed. For example, if a
user goes to `/profile`, only the module responsible for that feature area
should get loaded. It might be seen as a downside, the app will not be as snappy
as before (unless proper [preload strategy](#preload-strategy) is used). The
initial load will be faster though.

Lazy loading makes sense especially if our users are not going to typically
visit all the views during their session. If they're not going to even see
`/products`, why would they download it.

::: tip
Not all modules should be lazy loaded. If our app has some "core" feature
areas that are always visited by the users, it probably doesn't make sense
to lazy load them.
:::

### Implementation

Lazy loading is mostly accomplished with a proper setup of routing.
To use lazy loading, our feature modules need to have their own [routing
modules](#routes) that will use `Router.forChild(...)`.

Until now, our feature modules had the following setup:

- they were imported into the `AppModule` - that wass needed, because they had
  to be loaded at some point, otherwise they'd never be bundled.
- they had their own routing config that was being merged with the "main"
  routing setup in `AppModule` (or some other separate routing module like
  `AppRoutingModule`).

Here's what we need to change:

1. The main routing module (the one that calls `Router.forRoot(...)`) should now
include the routes to our feature areas together with a lambda to load these
modules dynamically, like this:

    ```ts
    const routes: Routes = [
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { 
        path: 'products', 
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) 
      }
    ];
    ```

2. Now, in the lazily loaded module's routing setup, we should treat the routing
path as if that module was at the root. Without lazy loading, we had `path:
'products'`, because feature module's routing would get merged with the "main"
routing. Now, the products area is treated as a child of the main routing. All
the child's routes go under the "*/products*" path, and the child module does
not need to know about it.

    ```ts{7}
    const routes: Routes = [
      {
        path: '',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: ProdctsListComponent, pathMatch: 'full' }, // /products
          { path: 'new', component: NewProductComponent }, // /products/new
          { path: ':id', component: ProductComponent, resolve: [ ProductResolverService ] }, // /products/:id
        ],
      }
    ];

    @NgModule({
      imports: [ RouterModule.forChild(routes) ],
      exports: [ RouterModule ]
    })
    export class ProductsRoutingModule { }
    ```

3. Lastly, make sure to **not** import (`NgModule`-import) the feature module
(like `ProductsModule` in this case) into the `AppModule`. The dynamic import in
the routing setup does that already. Additionally importing it with the `imports`
array would eagerly load the module.

With that, the code is split into bundles, each one fetched as needed.

::: danger Imports
With lazy loading, it becomes quite important to properly define ES imports.
Anything that we import in our files gets added to our bundle. Make sure to
import only the stuff you need. It's common to forget about cleaning up
the imports after some refactoring.
:::

::: tip Angular Modules
With lazy loading, also the Angular's `vendor.js` bundle may get decreased.
For example, if we'r using forms only in some feature area, after introducing
lazy loading, `FormsModule` will be fetched together with that feature area
instead of at bootstrap.
:::

### Preload Strategy

Lazy loading might make our app feel slow. Preload Strategy may fix that. After
splitting our app into bundles, we can download them all at bootstrap instead of
waiting for the user to actually need it. It may be configured in the root
routing configuration:

```ts{6}
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(
    routes, 
    { 
      preloadingStrategy: PreloadAllModules // NoPreloading is the default
    }
  )],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
```

The initial bundle is still kept small, the other bundles will be downloaded
after the first one gets fetched.

### Dependency Injection

Eager-loaded modules that provide services, make them available globally. That's
why we don't need to put modules that provide services into the `imports` array.

Lazy-loaded modules that proivde services, make them available only in that
single module.