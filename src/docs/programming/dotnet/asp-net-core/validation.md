---
title: Validation
description: Validation in ASP.NET Core
tags: .net, asp.net
lang: en-US
---

# Validation in ASP.NET Core

We can use the default method of adding `DataAnnotations` attributes (like
`[Required]`) or use *FluentValidation* package. For ASP.NET Core we need to
install *FluentValidation.AspNetCore*.

::: danger
The validation status has to be checked explicitly with `ModelState.IsValid`.
:::


## FluentValidations

Registration:

```csharp
services.AddControllers().AddFluentValidation(config =>
{
    config.RegisterValidatorsFromAssemblyContaining<Create>();
});
```

Usage:

```csharp
public class CommandValidator : AbstractValidator<Command>
{
    public CommandValidator()
    {
        RuleFor(n => n.Title).NotEmpty();
    }
}
```