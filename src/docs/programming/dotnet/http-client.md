---
title: HTTPClient
description: How HTTpClient should be used in .NET
tags: .net, asp.net
lang: en-US
---

# HttpClient

`HttpClient` uses implementations of `HttpMessageHandler` to do its job. The
default handler is `HttpClientHandler`.

There may be a chain of handlers (*delegating handler pattern*). Messages go
down throug handlers and responses go up to the `HttpClient`. Any handler can
decide not to pass message down and return a response earlier (i.e. caching).

## HttpClient configuration

```csharp
_httpClient.BaseAddress = "http://www..google.pl";
_httpClient.Timeout = new TimeSpan(0, 0, 30);

//Headers used by ALL requests:
_httpClient.DefaultRequestHeaders.Clear();
_httpClient.DefaultRequestHeaders.Accept.Add(
    new MediaTypeWithQualityHeaderValue("application/json")
);
```

Specifying `Accept` header is crucial for the client to be reliable. Server may
default to other formats, like XML, and our app cannot just expect to get JSON.
It needs to explicitly state that in an `Accept` header. Even if some endpoint
returns empty content it is still a good practice to set `Accept` header, in
case when an error is returned.

## HttpRequestMessage

Requests can be sent with "shortcut" methods of `HttpClient` like `GetAsync`,
but if more customization is required (like custom headers) an
`HttpRequestMessage` should be used.

### Headers

```csharp
request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
```

### Content

The base type of content is `HttpContent`. It is abstract. Derived types:

- `StringContent`
- `ObjectContent`
- `ByteArrayContent`
- `StreamContent`
- ...

Example:

```csharp
request.Content = new StringContent("abc");
request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
```

## Streams

Streams will help with memory usage. However, time might not always improve.
Still, memory usage is often of higher priority.

### Responses

It is recommended to ALWAYS use streams when reading data. When reading the
response's content, we can use `ReadAsStringAsync()`. However, it creates
unnecessary memory allocation for the whole content string, which we need only
for deserialization in most cases. It's a better idea to use
`ReadAsStreamAsync()` and deserialize the data from the stream directly.

```csharp
//using will dispose the stream. When not using streams, it doesn't do anything
using var response = await _httpClient.GetAsync("url");
var stream = await response.Content.ReadAsStreamAsync();
var data = JsonSerializer.DeserializeAsync<MyModel>(stream);
```

There is additional perfmance improvement. By default, `HttpClient` will return
the response only after the whole content is fetched from the server. We can
instead get the stream while it's still being fetched:

```csharp
var request new HttpRequestMessage(...);
//return as soon as the response headers arrive, instead of the whole content
using var response = await _httpClient.SendAsync(request, HttpCompletionOptions.ResponseHeadersRead);
using var stream = await response.Content.ReadAsStreamAsync();
var data = JsonSerializer.DeserializeAsync<MyModel>(stream);
```

### Sending data

`StreamContent` can be used to send body from a stream. Us it when posting large
amounts of data.

## Compression

It makes sense to use compression when getting data from servers (gzip,
deflate). `HttpClient` has built-in support for it, so that the data gets
decompressed automatically when it is received.

## Custom HttpMessageHandlers

To implement *delegating handlers* pattern, we should create a class inheriting
from `DelegatingHandler`. Example

```csharp
public class RetryPolicyDelegatingHandler : DelegatingHandler 
{
    private readonly int _maxRetries = 3;

    public RetryPolicyDelegatingHandler(int maxRetries)
        : base()
    {
        _maxRetries = maxRetries;
    }
    
    public RetryPolicyDelegatingHandler(HttpMessageHandler innerHandler, int maxRetries)
        :base(innerHandler)
    {
        _maxRetries = maxRetries;
    }

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
    HttpResponseMessage response = null;
        for (var i =0; i < _maxRetries; i++)
        {
            response = await base.SendAsync(request, cancellationToken);
            if (response.IsSuccessfulStatusCode)
            {
                return response;
            }
        }
        return response;
    }
}
```

Registration of custom handler:

```csharp
services.AddHttpClient<MyService>()
    .AddHttpMessageHandler(handler => new RetryPolicyDelegatingHandler(2));
```

We added just our custom handler, but there is always a default
`HttpClientHandler` in the end of the pipeline. If we want, we can configure it
additionally:

```csharp
services.AddHttpClient<MyService>()
    .AddHttpMessageHandler(handler => new RetryPolicyDelegatingHandler(2))
    .ConfigurePrimaryHttpMessageHandler(handler => {
        new HttpClientHandler()
        {
            AutomaticDecompression = System.Net.DecompressionMethods.GZip   
        }
    });
```

Now, first our custom handler will be invoked, and then the primary one with
custom configuration.

