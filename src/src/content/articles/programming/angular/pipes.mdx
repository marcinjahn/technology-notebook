---
title: Pipes
description: Pipes in Angular SPA framework - transforming inputs
tags: ["angular", "spa", "js", "ts", "pipes", "custom pipe"]
lang: en-US
---

Pipes in Angular work a bit similarly to UNIX shell pipes. They take some data
in an transform it into something else on the output.

Here's a quick example:

```html
<p>{{ name | uppercase }}</p>
```

The `name` is a property defined within the conponent. The `uppercase` token is
a **pipe**. It's built in Angular and it turns the input into an uppercase
string. The source of the string (component's property) does not get modified,
it's just displayed uppercase in the browser.

:::tip[Chaining]
We can chain multiple pipes together to apply some modifications sequentially.
:::

:::tip[Not only strings]
Pipes might work on any kind of data, not only strings. Additionally, they are
not only applicable to `{{ }}` outputs, but also to `ngFor`. For example, we
could use a pipe to filter some elements of the array.
:::

There are a bunch of [built-in pipes](https://angular.io/api/common#pipes), and
we can also create our own.

## Parameters

Some pipes support configuration via parameters. Here's an example of how to use it:

```html
<p>{{ endDate | date:'shortTime' }}</p>
```

The `DatePipe` pipe accepts format parameter. In this case, we used the
"shortTime" format.

:::tip[More parameters]
If there are more paremeters, we separate them with colons (`:`).
:::

The parameters may be dynamic, meaning we can use some variable as a value for
the parameter.

## Custom Pipes

The file name convention is to postfix it with `pipe.ts`.

Here's an example of a pipe that truncates inputs:

```ts
@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(input: any, length = 3) {
        if (input.length <= length) {
            return input;
        }
        return input.substr(0, length) + '...';
    }
}
```

Any pipe needs to return string data.
This pipe accepts an optional [parameter](#parameters) - `length`.

Pipes should be registered in module's declarations:

```ts{4}
@NgModule({
    declarations: [
        AppComponent,
        TruncatePipe
    ],
    ...
})
export class AppModule
```

The custom pipe can be used just like any other pipe:

```html
<p>{{ description | truncate:50 }}</p>
```

:::tip[ng CLI]
We can use ng CLI to generate a new pipe: `ng g p <name>`.
:::

## Async Pipe

There is a built-in pipe that is useful for `Promise<T>` and `Observable<T>`. It
displays the value only when it's resolved. Until then, it will display an
empty string. It's useufl for displaying the results of HTTP requests.

```html
<p>{{ dataFromApi | async }}</p>
```

## Impure Pipes

By default, pipes are **pure**. [Angular
docs](https://angular.io/guide/pipes#detecting-pure-changes-to-primitives-and-object-references)
say that pipes use a simplified change detection mechanism. This matters when we
apply a pipe to some composite object. Pipes will not recalculate the output
when the content of composite objects changes (like changing a property of input
object, or changing the amount of items in an input array). This improves
performance. We can disable that optimization on our pipes with `pure: false`
added in the decorator of the pipe. With that, our pipe will be rerun whenever a composite object changes.

Note that the default change detection will work if we change the reference of
the input composite object (e.g., pointing the variable to a different array).