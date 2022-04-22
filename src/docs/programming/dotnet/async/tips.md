---
title: TAP Tips
description: How to use Task-based Asynchronous Pattern (TAP) effectively
tags: .net, async, dotnet, await, tap, task
lang: en-US
---

# TAP Tips

TAP stands for Task-based Asynchronous Pattern. Here're a few tips how to
use it effectively in some scenarios.

## Long running operations

Don't use `Task.Run` for long running tasks. `Task.Factory.StartNew` has an
option `TaskCreationOptions.LongRunning` that under the covers creates a new
thread and returns a Task that represents the  execution. Using this properly
requires several non-obvious parameters to be  passed in to get the right
behavior on all platforms.

Don't use `TaskCreationOptions.LongRunning` with async code as this will create
a new thread which will be destroyed after first await

```csharp
public void StartProcessing()
{
    var thread = new Thread(ProcessQueue) 
    {
        // This is important as it allows the process to exit while this thread is running
        IsBackground = true
    };
    thread.Start();
}
```

## TaskCompletionSource

Always create `TaskCompletionSource<T>` with
`TaskCreationOptions.RunContinuationsAsynchronously`. By default, Task
continuations will run inline on the same thread that calls
Try/Set(Result/Exception/Canceled). As a library author, this means having to
understand that calling code can resume directly on your thread. This is
extremely dangerous and can result in deadlocks, thread-pool starvation,
corruption of state (if code runs unexpectedly) and more.

```csharp
var tcs = new TaskCompletionSource<int>(TaskCreationOptions.RunContinuationsAsynchronously);
```

## CancellationTokenSource

Always dispose CancellationTokenSource(s) used for timeouts

```csharp
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10))
```

## Cancelling operations

### Using CancellationTokens

Good implementation should dispose `CancellationTokenRegistration`.

```csharp
public static async Task<T> WithCancellation<T>(this Task<T> task, CancellationToken cancellationToken)
{
    var tcs = new TaskCompletionSource<object>(TaskCreationOptions.RunContinuationsAsynchronously);

    // This disposes the registration as soon as one of the tasks trigger
    using (cancellationToken.Register(state =>
    {
        ((TaskCompletionSource<object>)state).TrySetResult(null);
    },
    tcs))
    {
        var resultTask = await Task.WhenAny(task, tcs.Task);
        if (resultTask == tcs.Task)
        {
            // Operation cancelled
            throw new OperationCanceledException(cancellationToken);
        }

        return await task;
    }
}
```

### Using a timeout

Good implementation cancels the timer if operation successfully completes.

```csharp
public static async Task<T> TimeoutAfter<T>(this Task<T> task, TimeSpan timeout)
{
    using (var cts = new CancellationTokenSource())
    {
        var delayTask = Task.Delay(timeout, cts.Token);

        var resultTask = await Task.WhenAny(task, delayTask);
        if (resultTask == delayTask)
        {
            // Operation cancelled
            throw new OperationCanceledException();
        }
        else
        {
            // Cancel the timer task so that it does not fire
            cts.Cancel();
        }

        return await task;
    }
}
```

### Streams

Always call `FlushAsync()` on `StreamWriter` or `Stream` before calling
`Dispose()`

```csharp
using (var streamWriter = new StreamWriter(context.Response.Body))
{
    await streamWriter.WriteAsync("Hello World");
    // Force an asynchronous flush
    await streamWriter.FlushAsync();
}
```

### Returning `Task`

There are benefits to using the async/await keyword instead of directly
returning the `Task`:

- Asynchronous and synchronous exceptions are normalized to always be
  asynchronous.
- The code is easier to modify (consider adding a using, for example).
- Diagnostics of asynchronous methods are easier (debugging hangs etc).
- Exceptions thrown will be automatically wrapped in the returned Task instead
  of surprising the caller with an actual exception.

GOOD:

```csharp
public async Task<int> DoSomethingAsync()
{
    return await CallDependencyAsync();
}
```

BAD:

```csharp
public Task<int> DoSomethingAsync()
{
    return CallDependencyAsync();
}
```

### Attached/Detached tasks

`Task.Run` uses `Task.Factory.StartNew()` under the hood with an option
`DenyChildAttach`. It means that it will ignore children tasks being attached.
If we want the attachment, we can use `Task.Factory.StartNew`:

```csharp
await Task.Factory.StartNew(() -> {
    Task.Factory.StartNew(() -> {
        Thread.Sleep(1000);
    }, TaskCreationoptions.AttachedToParent);
    
        Task.Factory.StartNew(() -> {
        Thread.Sleep(1000);
    }, TaskCreationoptions.AttachedToParent);
}, TaskCreationOptions.);
```

The parent `Task` will be completed only when its 2 children are finished.
`Task.Run` would complete before that, because it does not allow attachment.

### Unwrapping

`Task.Run` automatically unwraps the result of async operations inside.
`Task.Factory.StartNew` does not do that. Example:

```csharp
var task = Task.Factory.StartNew(async () => 5);

var result = await await task; //Unwrapping
```

The way around that is:

```csharp
var task = Task.Factory.StartNew(async () => 5).Unwrap();

var result = await task; //Already unwrapped
```