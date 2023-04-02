---
title: Validation
description: Validation in ASP.NET Core
tags: [".net", "asp.net"]
lang: en-US
---

# Validation in ASP.NET Core

We can use the default method of adding `DataAnnotations` attributes (like
`[Required]`), build custom `DataAnnotations` or use *FluentValidation* package.
For ASP.NET Core we need to install *FluentValidation.AspNetCore*.

:::danger
The validation status has to be checked explicitly with `ModelState.IsValid`,
unless we use `[ApiController]` that does it automatically.
:::


## FluentValidations

It's a 3rd part validation library that is an alternative for the default
`DataAnnotations` approach.

Some advantages:

- `DataAnnotations` is based on `Attribute`, so it doesn't play well with the DI
- We can create validations that use multiple properties of an object (e.g.
  `StartDate` and `EndDate`)
- Easier to test
- Validation logic is outside of the models

Registration:

```csharp
services.AddValidatorsFromAssemblyContaining<SomeDataValidator>();
services.AddFluentValidationAutoValidation(options => 
{ 
    options.DisableDataAnnotationsValidation = true;
});
```

Usage:

```csharp
public class CommandValidator : AbstractValidator<Command>
{
    public CommandValidator()
    {
        RuleFor(n => n.Title)
            .NotEmpty()
            .WithMessge("Title cannot be empty");
    }
}
```