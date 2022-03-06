---
title: Razor Pages
description: Razor Pages in ASP.NET Core
tags: .net, asp.net, c#
lang: en-US
---

# Razor Pages

It's a framework for building multiple-pages based websites generated on the
server-side.

::: tip Origin
Razor Pages model was introduced in ASP.NET Core 2.0
:::

The flow is as follows:

1. A Razor Page is selected by the routing middleware.
2. The `PageModel` associated with the page is executed (e.g. `OnGet`).
3. The view is rendered using the data from the `PageModel`.

Pages are stored in the `.cshtml` files within the `Pages` directory of a
project (by default). **Razor** is a templating syntax.

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

Middleware setup:

```cs
builder.Services.AddRazorPages(); // register services in the IoC container

// ...

app.UseRouting(); // selects the Razor Page
app.MapRazorPages(); // executes the selected Razor Page
```

## MVC

The following components take up roles in the MVC paradigm:

- **Model** - the logic and data provided by our business logic (like some
  `WeatherProviderService`)
- **View** - the Razor Page template (the `.cshtml` file)
- **Controller** - the `.cshtml.cs` file containing page's logic. It interacts
  with the *Model* and invokes the *View* (or returns redirect/error)


::: warning ASP.NET Core MVC
**MVC** is a generic pattern used in many languages/frameworks. **ASP.NET Core
MVC** is an example of an implementation of the MVC pattern that uses actions
and controllers.

Razor Pages builds on top of the ASP.NET Core MVC, using it under the hood.

Before Razor Pages, developers would use the MVC framework directly.
:::

### Razor Pages vs ASP.NET Core MVC

We can build server-side websites with either Razor Pages or ASP.NET Core MVC
directly. In the latter case, we'd have `Controller`s and action methods within
it, just like with the ASP.NET Core Web APIs.

The controller would construct a view model and return a view based on it:

```cs
public ActionResult GetToDos(string id)
{
  var items = _todoProvider.Get(id);
  
  var viewModel = new TodoViewModel(items);
  return View(viewModel);
}
```

In contrast, int the Razor Pages approach, the `PageModel` is both the
*Controller* and the *View Model*.

The two approaches are quite similar, but some of the advantages of Razor Pages
are:

- each page is a separate set of files - in MVC, actions of some domain are all
  in the same controller (by convention), making it large sometimes.
- Razor Pages has a convention of placing related things close to each other. In
  MVC all controllers are in one `Controllers` directory, all view models are in
  the `View Models` directory, and all the views are in teh `Views` directory.
- pages that are static are easier/shorter to code using Razor Pages. In MVC
  we'd have to add an action that just returns the view (boilerplate code).

Both approaches are pretty similar. Razor Pages should be the preference though.

::: tip Mix
Razor Pages and MVC approaches can be used together in one application.
:::

## PageModel

Complex logic for a page should be handled in a the `PageModel` (a base class
for page models). We could use it to load data from some DB, etc. It is a "code
behind" file, similar to WPF.

::: tip Controller
`PageModel` name is unfortunate. It's a *Controller* in the MVC paradigm.
:::

The `PageModel` is executed first, then the page generated.

An example:

```cs
public class PrivacyModel : PageModel //base class
{
  private readonly ILogger<PrivacyModel> _logger;

  [BindProperty]
  public string SomeData {get; set;} // data bound from a request
  // GET requests do not bind data to properties by default.
  // To change that use [BindProperty(SupportsGet = true)]

  public PrivacyModel(ILogger<PrivacyModel> logger)
  {
      _logger = logger;
  }

  public void OnGet()
  {
      // void, Task or PageResult return type means that HTML should be generated
  }

  // max would be bound from the request
  public IActionResult OnPost(int max) 
  {
      // IActionResult can return other things: JSONs, redirects, errors, etc.

    // when binding data (to parameters of properties), validity should be checked
    if (!ModelState.IsValid) 
    {
      return RedirectToPage("./Index");
    }

    // do something...
  }
}
```

::: warning Overloading
A `PageModel` cannot have multiple methods with the same names (like `OnGet`).
:::

The properties of the model are accessible to the `.cshtml` view making it
possible to render dynamic data from the model. That data, exposed by the
`PageModel` may be called a *View Model*.

### Binding

Data is bound from:

1. form
2. path
3. query
4. headers?

By default, the framework looks through all of these sources for each parameter
to bind. We can also specify the source explicitly:

```csharp
[BindProperty]
[FromHeader]
public string Id { get; set; }
```

We can also use it on the method parameters.

::: tip JSON
To bind the JSON data from body, we have to use `FromBody`. Without it, data
will not be bound!
:::

::: tip ModelBinder
The `ModelBinderAttribute` may be used to have a total control over binding. In
example, we can change the name of value to be looked for in the request
compared to the name in our code.
:::

#### Class

If our Page has a few properties to bind from a request, we can introduce a
separate class that encompasses that data:

```csharp
class MyPage : PageModel
{
  [BindProperty]
  public InputData InputData { get; set; }

  // ...
}

class InputData 
{
  public string Category { get; set; }
  public string Product { get; set; }
  public string Color { get; set; }
}
```

#### Validation

Go to [Validation](./validation.md);

## URL

By default, the page's file path in the project defines the URL that would
execute that page. E.g. and URL `/products/list` would execute the page at
`Pages/Products/List.cshtml`.

### Handler

A single `PageModel` class may contain multiple methods to handle requests. The
name of the method should contain the HTTP method and, optionally, some
additional suffix. If we have multiple methods for the same HTTP method, but
with different suffixes, the selected suffix needs to be provided as a `handler`
parameter.

Method name template: `On{verb}{handler}[Async]`.

The `handler` should be included in the URL template for our Page.

::: tip Uncovered Cases
If a request comes in that doesn't match any method on `PageModel`, the view is
generated, but no logic is invoked on the `PageModel`.

An exception from this rule is the HEAD verb. If `OnHead` is not defined,
`OnGet` will be executed.
:::

## Layouts

Razor Pages has a concept og **layouts**, which is similar to components in SPA
frameworks. It avoids duplication of common parts of web pages. Layouts can be
found in the `Pages/Shared` directory.