---
title: Routing
description: Routing in Angular SPA framework
tags: angular, spa, js, ts, routing, router, url
lang: en-US
---

# Routing in Angular

Angular has a built-in router. When initializing a new project, the CLI asks if
it should be included or not. We can configure routing in the module file.

```ts{15}
const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'users', component: UsersComponent },
  { path: 'movies', component: MoviesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    // ...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

The selected component will be rendered as a child of `AppComponent`. We need to specify the exact placement of that component:

```html
<router-outlet></router-outlet>
```

## Navigation

With routing in place, we don't want to navigate between different pages in our
app with traditional `<a href="/whatever">Whatever</a>`. Clicking such a link
will work and the user will be taken to the right component (if the `/whatever/`
route was configured), but it comes with a huge issue - the whole application
will actually be reloaded from the server again. The app's state will be lost,
and it will be slow. Instead of that, we want the Angular Router to handle the
navigation, making it an in-app navigation rather than a browser-based
navigation. Here's how `<a>` elements should look like:

```html
<a routerLink="/home">Home</a>
```

## Styling

In order to have visual indication on the currently visited menu element, we
would normally attach some CSS class to that active element. Angular comes with
a helper directive that does that automatically - `routerLinkActive`.

```html
<div routerLinkActive="active">
    <a routerLink="/">Home</a>
</div>
```

The element that has the directive on it will have the "active" class attached
to it when the link is active. The directive can be attached on the `<a>` or on
some element that wraps it, like in the example above.

::: warning Exact
By default, the `routerLinkActive` directive applies the active class to
any link that is part of the current URL. For examle, a link to "/" would
always be marked as active, because it's always going to be a part of URL. In
order to fix that, we would have to specify additional configuration:

```html
<div 
    routerLinkActive="active"
    [routerLinkActiveOptions]="{ exact: true }">
    <a routerLink="/" >Home</a>
</div>
```

With that, the Home link will be marked as active only when the URL is exactly
"{domain}/".
:::