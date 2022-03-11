---
title: Overview
description: General information about ASP.NET Core
tags: .net, asp.net, c#
lang: en-US
---

# ASP.NET Core Overview

ASP.NET Core allows to build the following main kinds of applications:

- Razor Pages
- Web APIs

Both these application kinds use the ASP.NET Core MVC framework behind the
scenes.

A common thing is the `HttpContext` object, which flows through the middleware
containing all the infromation about the request, with potential additions from
the middleware. The response is also added to the `HttpContext` object.

## ActionResult

The following results can be returned from controllers:

- `PageResult` - HTML for a Razor Pages framework page
- `ViewResult` - HTML for an MVC framework controller
- `RedirectToPageResult` - returns 302
- `RedirectResult` - sends 302, but the target does not have to be a Razor Page
- `FileResult` - returns a file
- `ContentResult` - returns a provided string (not to be used with Razor Pages)
- `StatusCodeResult` - specified HTTP status code, optionally with some payload
  (not to be used with Razor Pages)
- `NotFoundResult` - 404

Some of the results have helper methods (such as `Page()` instead of `return new
PageResult()`);