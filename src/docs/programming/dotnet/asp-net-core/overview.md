---
title: Overview
description: General info about ASP.NET Corre
tags: .net, asp.net, c#
lang: en-US
---

# Overview

ASP.NET Core offers the following kinds of appliations:

- Razor Pages
- MVC
- Web APIs

A common thing is the `HttpContext` object, which flows through the middleware
containing all the infromation about the request, with potential additions from
the middleware. The response is also added to the `HttpContext` object.

## Middleware

The **middleware** are C# classes or functions that handle HTTP requests and
responses. They are chained together, forming a pipeline, similarly to how
`HTTPHandler`s can be chained in an `HTTPClient`.

All the requests pass through the middleware, so it's the right place to handle
common cross-cutting concerns. The middleware can process the request/response,
optionally modify it and pass on in the pipeline.

Requests/responses travel through the pipeline as `HttpContext` objects that can
be modified.

Middleware components should be small and handle just one responsibility.

Middleware can short-circuit the request causing it not to be passed to the
middleware parts behind it. If some middleware receives a request, it will also
receive a response going back.

::: tip 404
ASP.NET Core adds a middleware returning `404` in the end of the pipeline.
If none of our middleware handles the requests, that `404` one handles it.
:::

Middleware is added to the `WebApplication` (.NET 6) or to the
`IApplicationBuilder` (prior to .NET 6).

In general, middleware is added like this:

```cs
app.UseMiddleware<WelcomePageMiddleware>();
```

Often, middleware comess with extension methods that are more readable:

```cs
app.UseWelcomePage(); // calls the above behind the scenes
```

::: tip Use
Methods starting with `Use` are a convention for adding middleware.
:::

### Errors

Useful middleware:

- `DeveloperExceptionPageMiddleware` - displays stacktrace of an exception
- `ExceptionHandlerMiddleware` - alternative to the above, more suitable for
  production
- `StatusCodePagesMiddleware` - transforms raw error codes into some meaningful
  error-pages.

## Razor Pages

Pages are stored in the `.cshtml` files within the `pages` directory of a
project. **Razor** is a templating syntax.

Here's an example of `Pages/Privacy.cshtml`:

```cshtml
@page // Indicates that this is a Razor Page
@model PrivacyModel // Links to a model file (Privacy.cshtml.cs)
@{
    // C# code that is not part of the result HTML
    ViewData["Title"] = "Privacy Policy";
}

<!-- Result HTML -->
<h1>@ViewData["Title"]</h1>

<p>Use this page to detail your site's privacy policy.</p>
```

The file name matches the URL path. `localhost/Privacy` will run the
`Pages/Privacy.cshtml` page.

### Models

Complex logic for a page should be handled in a the `PageModel` (a base class
for page models). We could use it to load data from some DB, etc.
It is a "code behind" file, similar to WPF.

An example:

```cs
public class PrivacyModel : PageModel //base class
{
    private readonly ILogger<PrivacyModel> _logger;

    public PrivacyModel(ILogger<PrivacyModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
        // Handler for GET requests
        // void return type means that HTML should be generated
        // IActionResult can return other things: JSONs, redirects, errors, etc.
    }
}
```

### Layouts

Razor Pages has a concept og **layouts**, which is similar to components in SPA
frameworks. It avoids duplication of common parts of web pages. Layouts can be
found in the `Pages/Shared` directory.