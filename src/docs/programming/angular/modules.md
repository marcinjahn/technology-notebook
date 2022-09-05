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
- better performance

Angular itself bundles its various parts into modules. Here are some examples:

- `RouterModule`
- `FormsModule`
- `BrowserModule` and `CommonModule` - things like `ngFor` or `ngIf` directives
  are there!
- `HttpClientModule` - it only provides services

## Module Decorator

The `NgModule` decorator has the following options:

- `declarations` - here, we register all the **components**, **directives**, and
  **pipes**.
- `imports` - here, we pull in other modules, either provided by external
  parties (e.g. Angular itself) or our own modules.
- `exports` - a way to expose some entities to the other modules (those that
  will `import` the current module). E.g., if I export `RouterModule` from
  `SomeModule`, any module that imports `SomeModule` may use `RouterModule`'s
  features (its services, directives, etc.). We can export modules, components,
  directives, pipes. Export only those entities that you want to be usable in
  entities (like components) declared in other modules.
- `providers` - Dependency Injection setup. Alternatively, services can
  configure their injection via the `Injectable` decorator and its `providedIn`
  property.
- `bootstrap` - defines the starting component(s) (usually `AppComponent`)
- `entryComponents` - *deprecated*, it was used for [dynamic
  modules](./components.md#instantiating-components-from-typescript) in the
  past.

## Organizing Code into Modules

A recommended way of organizing code in larger applications is to split code
into modules by feature. E.g., we could have a set of components that are all
about the products domain. Also, we could have another set of components that
are all about managing orders. In this idealized scenario, we'd put
products-related components into one module, and the orders-related stuff into
another module.

### Scope

The entities declared in a module (e.g. components) have access ONLY to entities
that this module declares or imports (services are an exception, more on that
later). For example, if I create a `MyModule` module with some declared
component, I can use `routerLink` in that component only if I import
`RouterModule` into `MyModule` first. **I think this rule applies only to
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
its routes. We could go even further and create separate routes modules per
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
In the main `RouterModule` we usually use `RouterModule.forRoot()` method. In
these feature-specific route modules, we use `RouterModule.forChild`. In the
end, all these routes will be merged together.
:::

Note that even though in this routing module we reference some components, we
don't need to import them via the `imports` array. We need to import stuff only
if we plan to use it in the templates.