---
title: Identity
description: Identity in ASP.NET Core
tags: .net, asp.net, c#, identity
lang: en-US
---

# Identity in ASP.NET Core

ASP.NET Core has a built-in identity system that allows to use:

- internal accounts - stored in our database (by default SQL acessed with EF Core)
- external accounts with OpenId Connect

There is middleware for:
- **Authentication** - sets the `User` property of `HttpContext` if the user is
  recognized (e.g. via a cookie or token). It uses authentication services to
  recognize the user.
- **Authorization** - checks if the endpoint's requirements are fulfilled. If not,
  the reques is short-circuited.

::: warning Middleware Order
The Authorization middleware has to be executed after Routing and
Authentication. Thanks to Routing, the Authorizatin middleware knows what are
the requirements of the endpoint (the `[Authorize]` attributes). Thanks to
Authentication, the `User` property of `HttpContext` is set.
:::

::: tip Authorization Filter
Prior to ASP.NET Core 3.0, there was no `AuthorizationMiddleware`. Instead, an
Authorization filter was used.
:::

## Razor Pages

There is a UI package that contains various account management pages to be used
with internal accounts. They can be overriden to customize them.

## HttpContext

The `HttpContext` contains the `User` property, which is configured via the
Authentication middleware. It contains all the claims of the logged-in user.

## AuthorizeAttribute

The `AuthorizeAttribute` may be applied:

- globally
- on controller
- on action
- on Razor Page

If it's applied globally, but we want to allow anonymous access to some selected
endpoint (e.g. login page), we can use the `AllowAnonymousAttribute` to that
endppoint.

Options:

- `[Authorize]` - require the user to be logged and nothing more
- `[Authorize(Admin)]` - require the `Admin` policy to be satisfied

The policies are defined in the `Program.cs`/`Startup.cs` file:

```csharp
services.AddAuthorization(options => 
{
    options.AddPolicy("Admin", policyBuilder => 
    {
        policyBuilder.RequireClaim("IsAdmin")
    })
});
```

::: tip
Some other solutions, like Open Policy Agent, store policies and execute them
externally from the app's code being protected (e.g. in a sidecar).
:::

The `[Authorize]` attribute may be applied to an endpoint multiple times. In
such a case all of them have to be satisfied (AND).

## Forbidden Access

Web Apps with UI redirect the user to the login page (if user not logged in) or
return a message that access is denied (if user doesn't meet requirements).

Web APIs return 401 when no access token is attached or 403 if the token doesn't
have the required claims.

## Roles vs Claims

Nowadays, it is recommended to use the Claims-based authorization, although the
Roles-based model is also available.

## Resouce-based Authorization

Sometimes, to figure out if access shoud be granted, lookin over caller's claims
is not enough. We might have to call the database and check if the requested
data belongs to the caller. This requires imperative code instead of declarative
way of applying the `[Authorize]` attribute.

The action/Page that requires such authorization can use the
`IAuthorizationService` (via DI). It allows us to easily execute policies that
we define for our resources during the action/Page execution. It returns either
success or fail result, which we can use to either continue execution or return
`ForbidResult`.

To define such custom policies, we need `IAuthorizationRequirement`(s) and
`AuthorizationHandler<T,U>`. We also need to registed the policy in bootstrap.

::: tip Business Logic
It might be undesirable to depend on ASP.NET Core's components (like
`IAuthorizationService`) in our business logic. In such case we could create the
authorization logic entirely on our own.
:::
