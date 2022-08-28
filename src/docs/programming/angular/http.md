---
title: HTTP
description: HTTP requests in Angular SPA framework - senidng requests to Web API servers
tags: angular, spa, js, ts, http, request, web, api
lang: en-US
---

# HTTP Requests in Angular

Angular comes with a built-in HTTP client. That's a difference compared to
Vue.js or React, which do not provide such tooling.

In order to use the built-in client, it needs to be imported into your module.
You need to import the `HttpClientModule`. With that in place, we can inject the
HTTP client into our classes, kind of similar to how we'd do in
[.NET](../dotnet/http-client.md).

```ts
export class MyComponent {
    constructor(private httpClient: HttpClient) { }
}
```

The `HttpClient` has methods corresponding to actual HTTP methods, e.g.:

```ts{1,6}
httpClient.get<Person>('api.com')
    .subscribe(response => {
        // read response...
    });

httpClient.post<Person>('api.com', { name: 'Marcin' })
    .subsribe(response => {
        // read response...
    });
```

By default, all these methods return an `Observable`. We can use
[operators](./observables.md#operators) on them. [Error
handling](./observables.md#error-handling) is also the same as in `Observables`.

::: warning
The requests will actually NOT be sent out if nothing subscribes to 
the returned `Observable`!

We do not have to `unsubscribe()` from the observable, it's managed
by Angular.
:::

::: tip Body
Angular will serialize objects that should be sent as a body of the request
behind the scenes.
:::

Each method accepts an options object, which is the last parameter. There, we
can set things such as headers, query parameters, etc.

## Raw Response

By default, the subscrition returned when inoking an HTTP request, resolves to
an object representing the body of the response. In some cases, we might need
more data, like response headers or the status code. It can be configured via
the options object. Here's an example:

```ts
let sub = httpClient.get("api.com", {
    observe: 'response' // 'body' by default
})
```

::: tip Events
We can also observe `'events'` This one will bring multiple events informing
about the stage that the request is at (e.g. `Sent`, `Response`).
:::

## Best Practices

### Services

Instead of using `HttpClient` in our components directly, it makes more sense to
put that logic into some service. Such a service would work like a kind of
repository for a specific kind of data being fetched.