---
tags: .net, asp.net
---

# ASP.NET Core Validation

We can use the default method of adding Data attributes (like `[Required]`) or
use *FluentValidation* package. For ASP.NET Core we need to install
*FluentValidation.AspNetCore*.

## Registering FluentValidations

In `Startup`:

```csharp
services.AddControllers().AddFluentValidation(config =>
{
    config.RegisterValidatorsFromAssemblyContaining<Create>();
});
```

## Validation class

```csharp
public class CommandValidator : AbstractValidator<Command>
{
    public CommandValidator()
    {
        RuleFor(n => n.Title).NotEmpty();
    }
}
```

