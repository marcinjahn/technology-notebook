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

The default `Program.cs` file looks as follows:

```cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting(); // selects the Razor Page
app.UseAuthorization();
app.MapRazorPages(); // executes the selected Razor Page

app.Run();
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
  the `View Models` directory, and all the views are in thh `Views` directory
  (with Razor syntax).
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

The model to use for a Page is specified with the `@model` directive.

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

::: warning
Views shouldn't call methods on the `PageModel`.
:::

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

## Data in Razor

Razor Page can access "external" data in the following ways:

- `PageModel`'s public properties - the recommended way (accessed as
  `@Model.{property}`)
- `ViewData` - a dictionary whose key-values pair may be set from a `PageModel`.
  It's useful for passing data between layouts.
- `HttpContext` object
- `@inject {service}` - we can use services from DI directly in views

### ViewData

`ViewData` can be set directly in the view itself:

```razor
<h1>@ViewData["Title"]</h1>
```

It can also be set in the `PageModel`:

```csharp
public class MyModel : PageModel
{
  // A property of a `PageModel` may be defined as a `ViewData`:
  [ViewData]
  public string Title { get; set; }

  public void OnGet() 
  {
    Title = "My Title";
    ViewData["Subtitle"] = "My Subtitle";
  }
}
```

## Razor Syntax

[MSDN](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor) is the best
place to follow.

### Tag Helpers

Tag Helpers are useful mostly with forms. In general, tag helpers reduce the
amount of markup that we have to write, making the HTML more readable and less
C#-y.

The HTML elements that have tag helpers attached to them are modified by the
framework. No other element can be modified.

::: tip NuGet
Tag Helpers are included as part of the framework. Additionally, we can get more
of them from NuGet, or even create our own.
:::
Tag Helpers, like validation, relies on the `DataAnnotations`.

An example:

```razor{6,9,11,13,17-19}
@page
@model CheckoutModel

<h1>@ViewData["Title]</h1>
<!-- Tag Helper will generate URL to submit to (adds "action" and "method" HTML attributes) -->
<form asp-page="Checkout">
  <div class="form-group">
    <!-- Label content (from DataAnnotaions' DisplayName or property name itself) -->
    <label asp-for="Input.FirstName"></label>
    <!-- Input type (from DataAnnotations) -->
    <input asp-for="Input.FirstName" />
    <!-- Validation message (from ModelState) -->
    <span asp-validation-for="Input.FirstName"></span>
  </div>

  <div class="form-group">
    <label asp-for="Input.LastName"></label>
    <input asp-for="Input.LastName" />
    <span asp-validation-for="Input.LastName"></span>
  </div>

  <button type="submit">Submit</button>
</form>
```

With this markup, the generated HTML elements have proper content, ids, names,
client-side validation.

Some tag helpers are about attributes that mey be added to elements (`asp-*`).
Some other tag helpers are completely new HTML elements:

```razor
<environment include="Testing,Staginfg">
  <div>THIS IS A TESTING ENVIRONMENT</div>
</environment>
```

We could have this functionality without Tag Helpers, we could use some `@if`.
However, Tag Helper makes it shorter and more readable.

## Reusing Code

### Layouts

Razor Pages has a concept of **Layouts**, which allows to define common
structures of web pages. It avoids duplication of common parts of web pages.
Layouts can be found in the `Pages/Shared` directory.

A simple layout example:

```razor
<!DOCTYPE html>
<html>
<head>
  <meta> charset="utf-8" />
  <!-- Title could come from some child view -->
  <title>@ViewData["Title]</title>
  <!-- Layouts are the place to reference CSS, JS -->
  <link rel="stylesheet" href="~/css/site.css" />
</head>
<body>
  @RenderBody()
</body>
</html>
```

Every layout needs to call the `@RenderBody()` function. That is where the child
view will be rendered. We can also use **Sections** in a layout to define more
spots for rendering content.

For example, layouts could define:

- a general page structure - navbar, sidebar, footer, and a place to put content
- multiple-column layout with separate sections to put content in these columns

::: tip "_" Prefix
Bot the Layouts and the Partial Views file names should be prefixed with `_`.
:::

#### Choosing a Layout

The base layout should be named `_Layout.cshtml`. This layout is selected for
every Page by default. A different layout may be selected by setting the
`Layout` property in a view (e.g. `Layout = "_MyLayout"`).

::: tip Nesting
Layouts can reference other layouts.
:::

### Partial Views

Another option to use is **Partial Views**. They act much more similarly like
components in SPAs.

- **Layouts** define the OUTSIDE of the Page.
- **Partial Views** may be included INSIDE of the page

Partial Views are all about HTML markup and reusing it. When using a Partial
View we can pass some data into it. Partial Views do not have `PageModel`s
associated with them.

```razor
<partial name="_MyPartial" model="someData">
```

::: tip Tag Helper
`<partial>` is a tag helper.
:::

The file of the Partial View may be located anywhere in teh directory tree of
the Page that uses it, or in the `Pages/Shared` or `Views/Shared`.

### _ViewImports

The `_ViewImports.cshtml` file may be used to define namespace imports that are
common in our application. It can be placed in any directory and it will be used
by any Page in that folder and sub-folders. Placing it in the `/Pages` directory
makes it applicable to all pages.

We can use `@using` and `@addTagHelper` in `_ViewImports`.

### _ViewStart

The `_ViewStart.cshtml` allows us to run some common code BEFORE the view itself
executes. It's often used to set the `Layout`. This way we don't have to do it
repeatedly in every page.

::: warning _ViewStart
Partial Views and Layouts do not run the `_ViewStart.cshtml` when they execute.
:::

The filesystem placement works the same way as with the `_ViewImports` files.