---
tags: react, mobx
---

# MobX Tips

MobX allows mutating state, in opposition to Redux.

## Packages

```bash
npm i mobx mobx-react-lite
```

The `mobx-react-lite` package adds observers, which is a capability of observing
store observables by the components. THose are necessary for apps to work
correctly. `mobx-react-lite` supports only *function components* and
`mobx-react` supports *class components* additionally.

## Decorators

MobX allows to use decorators for indicating oservales, actions, etc. It's an
experimental feature and it needs to be enabled in `tsconfig.ts`, like this:

```json
{
  "compilerOptions": {
...
    "experimentalDecorators": true
  },
...
}
```

## Store Example

```js
import { observable } from "mobx";
import { createContext } from "react";

class ActivityStore {
  @observable title = "Hello from mobx";
}

export default createContext(new ActivityStore());
```

In the component:

```js
//App.tsx
const activityStore = useContext(ActivityStore);
...
export default observer(App); //higher order component from mobx-react-lite package
```

## Modifying state

MobX recommends to mutate state only inside actions. If using ASYNC code in
actions state might be mutated outside of action! Solution is to use
`runInAction` method after any async. Example:

```js
@action
...
var activities = await agent.Activities.list();
    runInAction(() => {
    activities.forEach(n => {
        n.date = n.date.split(".")[0];
        this.activityRegistry.set(n.id, n);
    });
});
```

In order to see errors when we mutate state outside of actions, we can do:

```js
configure({ enforceActions: "always" });
```

in a global context.