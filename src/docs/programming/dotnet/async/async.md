---
title: How Async Works
description: Details about how async/await works under the hood in .NET
tags: .net, async, dotnet, await, tap, task
lang: en-US
---

# How Async works

## async/await keywords

Methods marked with `async` may use the `await` keyword. The `async` keyword was
introduced for compatibility with older code, which could've used `await` as a
name of variables or other things. This way, if such older code gets upgraded to
.NET > 4.5 (Framework), it will continue to work. Only after the `async` keyword
is added, the `await` becomes a keyword in a method.

## State Machine

The code that uses async/await is just a syntactic sugar. In reality, that code
gets turned into a state machine where state transitions happen whenever `await`
is encountered. The `async` methods get turned into classes representing those
state machines.

Here's an example stolen from [Microsoft
DevBlog](https://devblogs.microsoft.com/premier-developer/dissecting-the-async-methods-in-c/):

Before:

```cs
class StockPrices
{
    private Dictionary<string, decimal> _stockPrices;
    public async Task<decimal> GetStockPriceForAsync(string companyId)
    {
        await InitializeMapIfNeededAsync();
        _stockPrices.TryGetValue(companyId, out var result);
        return result;
    }
 
    private async Task InitializeMapIfNeededAsync()
    {
        if (_stockPrices != null)
            return;
 
        await Task.Delay(42);
        // Getting the stock prices from the external source and cache in memory.
        _stockPrices = new Dictionary<string, decimal> { { "MSFT", 42 } };
    }
}
```

After:

```cs
class GetStockPriceForAsync_StateMachine
{
    enum State { Start, Step1, }
    private readonly StockPrices @this;
    private readonly string _companyId;
    private readonly TaskCompletionSource<decimal> _tcs;
    private Task _initializeMapIfNeededTask;
    private State _state = State.Start;
 
    public GetStockPriceForAsync_StateMachine(StockPrices @this, string companyId)
    {
        this.@this = @this;
        _companyId = companyId;
    }
 
    public void Start()
    {
        try
        {
            if (_state == State.Start)
            {
                // The code from the start of the method to the first 'await'.

                if (string.IsNullOrEmpty(_companyId))
                    throw new ArgumentNullException();
 
                _initializeMapIfNeededTask = @this.InitializeMapIfNeeded();
 
                // Update state and schedule continuation
                _state = State.Step1;
                _initializeMapIfNeededTask.ContinueWith(_ => Start());
            }
            else if (_state == State.Step1)
            {
                // Need to check the error and the cancel case first
                if (_initializeMapIfNeededTask.Status == TaskStatus.Canceled)
                    _tcs.SetCanceled();
                else if (_initializeMapIfNeededTask.Status == TaskStatus.Faulted)
                    _tcs.SetException(_initializeMapIfNeededTask.Exception.InnerException);
                else
                {
                    // The code between first await and the rest of the method
 
                    @this._store.TryGetValue(_companyId, out var result);
                    _tcs.SetResult(result);
                }
            }
        }
        catch (Exception e)
        {
            _tcs.SetException(e);
        }
    }
 
    public Task<decimal> Task => _tcs.Task;
}
 
public Task<decimal> GetStockPriceForAsync(string companyId)
{
    var stateMachine = new GetStockPriceForAsync_StateMachine(this, companyId);
    stateMachine.Start();
    return stateMachine.Task;
}
```

::: tip Debug vs Release
In the Debug mode, the generated state machine is a class. In the Release mode,
it's a struct.
:::

The `TaskCompletionSource` is a crucial player in the Task-ecosystem. This is
what controls the state of the task in the background.

## Sources

- [Dissecting the async methods in
  C#](https://devblogs.microsoft.com/premier-developer/dissecting-the-async-methods-in-c/)
  and
  [GitHub](https://github.com/kevingosse/MyTask/blob/main/TaskLibrary/Task.cs)
- [Designing and rewriting asynchronous tasks from scratch - Kevin Gosse - NDC
  Oslo 2020](https://www.youtube.com/watch?v=glPrWPr-IPc)