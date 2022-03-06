---
title: Routing
description: Routing in ASP.NET Core
tags: .net, asp.net, c#
lang: en-US
---

# Routing

Routing is the process of mapping an incoming request to a handler (Razor Page,
or an action on some MVC controller).

Routing uses URL's path to decide on the handler. It doesn't use query
parameters. These are bound in the handler to parameters/properties.

`RoutingMiddleware` is added to the app with:

```cs
app.UseRouing();
```

::: tip
Routing is not case-sensitive
:::

This middleware is responsible for selecting the endpoint for a requests.
Endpoints can be either MVC or Razor Pages (or some middleware). All of them
need to be registered with the `EndpointMiddleware`. That middleware has a
dictionary of all registered endpoints, and it is shared with the
`RoutingMiddleware`. Routing middleware looks through the dictionary for every
requests and makes a "note" about the selection in the `HttpContext` object.
`EndpointMiddleware` looks at that "note" and executes the selected endpoint
handler.

::: tip Separation of routing and execution
The process of selecting an endpoint and executing it are separated into
different middleware components. Thanks to it, we can add some other middleware
between those. That middleware has access to the information which endpoint
handler was selected by the routing middleware. Example of that is the
`AuthorizationMiddleware`, which can do some authorization based on the selected
endpoint.
:::

## Route Templates

When defining routes, the template syntax is used making it possible to have
some parts of the URLs dynamic.

::: tip Binding
Placeholder values from a URL can be used during model binding.
:::

Here are the options:

- static URL, e.g. `/users`
- placeholders, e.g. `/products/{productId}`
- placeholder with defualt value, e.g. `/products/{productId=123}` - when
  navigating to "/products", a "/products/123" route will be taken
- optional placegolder, e.g. `/products/{productId}/{color?}` - optional
  parameters only make sense at the end of the route template.
- catch-all parameter, e.g. `/products/{*restOfUrl}` - `restOfUrl` will contain
  the rest of the URL, even if there are slashes. (there can be either 1 or 2
  asterisks (`*`) in the template).

### Constraints

To avoid weird binding issues we can constraint dynamic parts of the template:

- `/products/{id:int}` - `id` has to be convertible to an integer
- `/products/{id:min(5)}` - `id` has to be integer and min 5.
- `/products/{id:length(3)}` - `id` has to have 3 characters.
- `/products/{id:int?}` - `id` is optional, but if provided it has to be
  convertible to an integer
- `/products/int:max(10)?`

::: warning Binding Exceptions
If we have an unconstrained template `/products/{id}` and our handler is
`OnGet(int id)`, an exception would be thrown if we called "/products/test". The
framework would try to bind "test" string to the `id` parameter that is an
integer.

With proper constraints, that endpoint would be just skipped and not matched.
:::

## Convention vs Attributes

Routes can be defined either in a signle place making all endpoints follow some
convention, or we can use attributes on every action to define a route for that
endpoint specifically. The latter apporach gives more freedom and makes it much
easier to introduce changes for a specific endpoint.

### Razor Pages

Razor Pages uses a combination of convention and attribute-based routing. The
routes are created by the `MapRazorPages()` extension method. All files in the
`Pages` direcotry are analyzed and routes are created for them based on their
placement.

::: tip Index
The `Index.cshtml` files are an exception from that rule. They are mapped to
both `xyz/` and `xyz/Index` (we could have multiple `Index.cshtml` files in
different directories).
:::

To customize the route of a given Razor Page, we need to modify the `@page`
directive of a given page. Some examples for a page at `Pages/Items.cshtml`:

- `@page "Something"` - the URL will be "/items/something" (**appending**)
- `@page "{category}/{productId}"` - the URL will be
  "items/`{category}`/`{productId}`" (**appending**)
- `@page "/Something"` - the URL will be "/something" (**replacing**)
- `@page "/{category}/{productId}"` - the URL will be
  "/`{category}`/`{productId}`" (**replacing**)

With such modifications, the default file location-based route is no longer
valid.

## Generating URLs

The framework has a helper for generating URLs to other parts of our app.
An example:

```csharp
var url = Url.Page("Products/Winter", new { id = "273" });
```

The `Url` object is a property on `PageModel` base class. It has various methods
for building URLs. We can provide some parameters, and the helper will fit this
into the template of the taget page.

::: tip Relative or Absolute
We can proivde relative or absolute links. The example above was relative.
Absolute link (starts from the `Pages` directory) should start from a `/`.
:::