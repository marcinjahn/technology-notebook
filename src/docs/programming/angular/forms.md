---
title: Forms
description: Forms in Angular SPA framework
tags: angular, spa, js, ts, forms, validation
lang: en-US
---

# Forms in Angular

Angular comes with built-in tools to help us with dealing with forms.
There are two ways to create forms in Angular:

- template-driven
- reactive

## Setup

The `FormsModule` needs to be imported into `AppModule`.

## Template-Driven Approach

This is the easiest approach. 

1. Define our form in HTML within the `<form>` tags. Use `ngSubmit` event of the
   form and a reference.

    ```html{1}
    <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <input type="text">
        <input type="text">
        <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
        </select>
        <button type="submit">Sumbit</button>
    </form>
    ```

    The `#f="ngForm"` is a syntax specific to Template-Driven Forms in Angular.
    We could name it differently than `#f` though.

2. Mark inputs that matter to you with the `ngModel` directive and name them.

    ```html{2,4}
    <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <input type="text" ngModel name="age">
        <input type="text">
        <select ngModel name="options">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
        </select>
        <button type="submit">Sumbit</button>
    </form>
    ```

    ::: tip ([ngModel])
    We could use `([ngModel])` instead of `ngModel` to additionally get two-way
    data binding to some variable on our component.
    :::

    In this case, the second input does not matter to us for some reason, so we
    do not add any attributes to it.

3. Angular will analyze it and produce the JS representation of data in that
form. We can retrieve it in handler method:

    ```ts
    onSubmit(form: NgForm) {
        // do something...
    }
    ```

The `NgForm` object contains lots of properties. One of them is `value`. In case
of the simple form above, `value` would look someting like this:

```json
{
    "age": "20",
    "options": "option2"
}
```

Among the other included properties are: `touched`, `dirty`, `valid`,
`controls` (holds references to controls of the form).

::: tip @ViewChild
We could also access the form via `@ViewChild('f')`. It would be of type
`NgForm` containing the same properties as mentioned before.

This way we can access the form before the user hits `Submit`.
:::

### Validation

There are a few directives that we can place on form inputs to have
them validated. Examples of such directives are:

- `required`
- `email`

A full list can be found at [Angular
Docs](https://angular.io/api?type=directive) <- this is a list of all directives
shipped with Angular. The ones with `Validator` suffix are for validation.

In case of validation being unsuccesful, the `valid` property of `NgForm` will
be `false`.

The `valid` property is also available on each control of the form, so they can
be checked separately.

#### CSS

Angular adds various classes to inputs in specific states. Examples:

- `ng-dirty`
- `ng-touched`
- `ng-valid`
- `nv-invalid`

We can make use of these classes to apply styling to various states of
our form.

::: warning form
The overall `<form>` tag also has these classes applied. We could get around
that by specifying `input` explicitly:

```css
input.ng-invalid {
    border: 1px solid red;
}
```
:::

#### HTML 5 Validation

HTML 5 comes with its own validation system. Angular disables it by default. It
can be enabled with `ngNativeValidate` attribute on a control.

### Default Values

We can provide default, prerendered values for form controls.

```html
<input type="text" [ngModel]="'some default value'">
```

The `ngModel` is used with square brackets only, it's not bi-drectional binding
(`([ngModel])`).

### Grouping Inputs

In bigger forms, we can group inputs. It might be useful also for partial
validation - we could mark some group of inputs as invalid.

```html{2}
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
    <div ngModelGroup="basicInfo">
        <input type="text" ngModel name="age">
        <input type="text" ngModel name="hobby">
    </div>

    <select ngModel name="options">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
    </select>
    <button type="submit">Sumbit</button>
</form>
```

As you can see above, we can just use `div`s with a special directive
`ngModelGroup`.

Now, when we access the `value` property of that `NgForm`, we'd see something
like this:

```json
{
    "basicInfo": {
        "age": "20",
        "hobby": "cooking"
    },
    "options": "option2"
}
```

Also the `controls` property of the form will have our `basicInfo` listed as a
control. Accessing its `valid` property returns validation status for the
grouped inputs.

### References

The `#f="ngForm"` attribute allowed us to access the form in the Submit button.
We can also access each control on its own, by attributing it with
`#mycontrol="ngModel"`. It's especially useful when we want to check `valid`
property of a control to conditionally display some helpful text like "username
is required".

Similarly, we can also mark input groups with `ngModelGroup`:

```html
<div ngModelGroup="basicInfo" #basicInfo="ngModelGroup">
    <input type="text" ngModel name="age">
    <input type="text" ngModel name="hobby">
</div>
```

::: tip Form Context
When we apply just `#something` to some HTML tag, we can get access to the
tagged element from the outside (either HTML or TS with `@ViewChild`). However,
this access is not in the context of the form. The syntax of
`#a="ngForm"`/`#b="ngModel"`/`#c="ngModelGroup"` lets Angular know that the
reference should have form-related properties.
:::

## Reactive Approach

The form gets created in TS, we have more control over it.