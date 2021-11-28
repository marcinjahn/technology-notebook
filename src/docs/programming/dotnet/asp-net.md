---
tags: .net, asp.net
---

# ASP.NET Tips

## Cancelling request

Every API endpoint can have `CancellationToken` as one of its parameters. It's
cancelled when client cancells request. We can use this token when handling
request. Example:

```csharp
[HttpGet]
public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
{
    return await _mediator.Send(new List.Query(), ct);
}
```

> What's the recommended way of actually handling the cancellation?

## MediatR

It's a good idea to use MediatR as a kind oif broker for requests. It makes
controller quite simple and also encourages CQRS. It requires
`MediatR.Extensions.Microsoft.DependencyInjection` package to be installed in
the project where business logic is (asp.net seems to have it by default
already). Then, controllers do this:

```csharp
private readonly IMediator _mediator;

public ActivitiesController(IMediator mediator)
{
    _mediator = mediator;
}

[HttpGet]
public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
{
    return await _mediator.Send(new List.Query(), ct);
}
```

Example of a request handler:

```csharp
public class Details
{
    public class Query : IRequest<Activity>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Activity>
    {
        private readonly DataContext _dbContext;

        public Handler(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _dbContext.Activities.FindAsync(request.Id);
            return activity;
        }
    }
}
```

What's needed is an implementation of `IRequest` and `IRequestHandler`.

In order to registers handler with MediatR, we need to do this in
`ConfigureServices`:

```csharp
services.AddMediatR(typeof(Details.Handler).Assembly);
```

It uses reflection to find all handlers. We used `Details.Handler` here just to
find its assembly where all other handlers reside.

## Custom error middleware

Middleware:

```csharp
public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;
    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _logger = logger;
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
            await HandleExceptionAsync(context, e);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        object errors = null;

        switch (ex)
        {
            case RestException re:
                _logger.LogError(ex, "REST ERROR");
                errors = re.Errors;
                context.Response.StatusCode = (int)re.Code;
                break;
            case Exception e:
                _logger.LogError(ex, "SERVER ERROR");
                errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                break;
        }

        context.Response.ContentType = "application/json";
        if (errors != null)
        {
            var result = JsonSerializer.Serialize(new
            {
                errors
            });

            await context.Response.WriteAsync(result);
        }
    }
}
```

In `Startup`:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseMiddleware<ErrorHandlingMiddleware>();
    ...
}
```

Putting that in the beginning is a good idea.