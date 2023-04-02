---
title: Angular Universal
description: Server Side Rendering (SSR) with Angular Universal
tags: ["angular", "spa", "js", "ts", "ssr", "universal"]
lang: en-US
---

# Angular Universal

Angular Universal is a package that turns our app into a Server-Side Rendered
(SSR) one. It'm mostly beneficial for the SEO, making the inital state of our
app actually usable.

Without SSR, the initial page load delivers an `index.html` file that does not
include any actual content other than the tag representing our root component.
The actual HTML gets generated only after the JS scripts are pulled in and
executed. This makes the site appear slow.

With SSR, the site gets rendered on the server, and the initial load of
`index.html` brings this file with the actual content already there.

:::tip[Code Executed Twice]
The component logic is executed twice - once on the server, and then in the
browser. For example, if out `app.component.ts` had a `console.log('Hello')` in
its `ngOnInit()`, we'd see that log both in the server's logs and in the
browser's console.
:::

## Installation

```sh
ng add @nguniversal/express-engine
```

This creates new SSR-related files:

- `server.ts` - an Express app that will serve the Angular app.
- `tsconfig.server.ts` - TS config for the server-side code.
- `src/main.server.ts` - bootstrapper for server app
- `src/app/app.server.module.ts` - 

## Browser APIs

When the code gets executed on the server, we cannot make use of
Browser-specific APIs, such as the `window` object, `localStorage`, and others.
Our code might need to be able to figure out the context of the execution -
whether it's the server or the browser. We can inject the `PLATFORM_ID`
constant:

```ts
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

...

constructor(@Inject(PLATFORM_ID) private platformId) {}

ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        // do something in the browser...
    }

    if (isPlatformServer(this.platformId)) {
        // do something on the server...
    }
}
```

## TransferState

When rendering the page on the server, it might make sense to also fetch some
data from some web API (potentially that API is not even accessible on the
client side). That data may be later retrieved by the browser using
`TransferState`.

The data being transfered to the browser is serialized with `JSON.stringify`,
and the client deserializes it with `JSON.parse`.

```ts
import { TransferState, makeStateKey } from '@angular/platform-browser';

export const SOME_DATA = makeStateKey('some-data');

@Injectable({
  providedIn: 'root'
})
export class SomeDataService {

  private isServer = false;

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isServer = isPlatformServer(platformId);
  }
  
  getData() {
    if (this.transferState.hasKey(key)) {
      return Observable.of(this.transferState.get(SOME_DATA, []));
    } else {
      return getDataFromApi().pipe(
        tap((data) => {
          if (this.isServer) {
            this.transferState.set(key, data);
          }
        })
      );
    }
  }

  private getDataFromApi() {
    // API call...
  }
}
```