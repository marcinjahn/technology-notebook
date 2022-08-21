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

This is the easiest approach. It requires the `AppModule` to import
`FormsModule`.

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

In case of validation being unsuccessful, the `valid` property of `NgForm` will
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

The form gets created in TS, we have more control over it. This time, istead of
importing `FormsModule` in our `AppModule`, we need to import the
`ReactiveFormsModule`.

Now, inside of the component wheret the form would reside, we'd create a
property of type `FormGroup`:

```ts{2,5}
export class MyComponent implements OnInit {
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = new FormGroup({
            'username': new FormControl(null), // initial state will be empty
            'email': new FormControl(null),
            'hobby': new FormControl('chess')
        });
    }
}
```

::: tip
The object passed to `FormGroup`'s constructor has keys wrapped in quotation
marks to protect us from minification that would potentially change these names.
Since we reference these names from the HTML code, we don't want the names to
get changed.
:::

Now, we need to write HTML code representing the form:

```html{1,5,13,21}
<form [formGroup]="myForm" (ngSumbit)="onSubmit()">
    <div>
        <label for="username">Username</label>
        <input
            formControlName="username"
            id="username" 
            type="text">
    </div>

    <div>
        <label for="email">Username</label>
        <input 
            formControlName="email"
            id="email" 
            type="text">
    </div>

    <div *ngFor="let hobby of ['chess', 'dancing', 'movies']">
        <label>
            <input 
                formControlName="hobby"
                [value]="hobby" 
                type="radio">
            {{ hobby }}
        </label>
    </div>

    <button type="submit">Sumbit</button>
</form>
```

The `ngSubmit` event works similarly like in the Template-driven design. This
time we do not have to use reference though, because we have the form variable
in our component already (in the example here it would be `myForm`). This
variable will be an object containing the same fields as the `NgForm` does.
Inside of `value` we will get exactly the same structure of inputs as we defined
in our component.

### Validation

We no longer use directives on HTML elements to define validation. We do that in
TS code:

```ts{6}
export class MyComponent implements OnInit {
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = new FormGroup({
            'username': new FormControl(null, Validators.required), // 1 validator
            'email': new FormControl(null, [Validators.required, Validators.email]), //multiple validators
            'hobby': new FormControl('chess')
        });
    }
}
```

#### CSS

The same way as it's done with Template-driven forms, Angular assign various CSS
classes to HTML elements based on their state (e.g. `ng-touched`).

#### Custom Validators

We can define custom validators. A validator is just a function that either
returns an object (when invalid) or `null` (when valid).

```ts
hobbyValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === "football") {
        return { 'hobbyIsInvalid': true }; // INVALID
    }

    return null; // VALID
}
```

The validator needs to be applied to the control that needs it:

```ts
this.myForm = new FormGroup({
    'username': new FormControl(null),
    'email': new FormControl(null),
    'hobby': new FormControl(null, this.hobbyValidator)
});
```

::: warning this
If we plan to access any member of the component in the validator with `this`,
we need to bind the validator to the component's instance:

```ts
'hobby': new FormControl(null, this.hobbyValidator).bind(this)
```
:::

Each control that has some invalid inputs, will have appropriate errors in its
`FormControl`'s `errors` property. It is an object with keys corresponding to
individual errors. In our custom validator, the key would be called
"hobbyIsInvalid", becuase that's the property that we set in the object we
return. The default validators define their own keys. For example, the `required` validator just outputs `{ required: true }` in its logic and that's the property that would appear in the `errors` object.

::: tip
The `errors` property on the root `FormGroup` does not aggregate all of the
errors. They need to be checked on the individual controls.
:::

#### Asynchronous Validators

In some cases we might want our validators to do some network request, e.g. to
check if username is not taken already. Angular supports asynchronous validators for such cases. Here's how one could looks like:

```ts
async usernameFree(control: FormControl): 
    Promise<{[s: string]: boolean}> | Observable<{[s: string]: boolean}> {
    
    const isFree = await someService.checkAvailability(control.value);
    if (isFree) {
        return null; // VALID
    }

    return { 'usernameTaken': true }; // INVALID
}
```

Asynchronous validators should be passed as a third argument to `FormControl`. The second argument is for synchronous validators only.

```ts
this.myForm = new FormGroup({
    'username': new FormControl(null, [], this.usernameFree), // async (could be an array of validators)
    'email': new FormControl(null),
    'hobby': new FormControl(null, this.hobbyValidator) // sync
});
```

::: tip Pending
While the asynchronous validator is being executed, the control that the
validation is done upon is assigned the `ng-pending` class. This way we can
style the control to indicate that something is happening in the background.
:::

### Accessing Controls

We can access individual controls in HTML with:

```html
<input formControlName="email" id="email" type="text">
<span *ngIf="!myForm.get('email').valid">Invalid e-mail</span>
```

#### Subscriptions

The form and its indiviual control can be subscribed to for:

- value changes
- status changes (e.g. valid, invalid)

Here's an example for value changes:

```ts
this.myForm.valueChanges.subscribe(value => {
    // executed on every change...
});
```

#### Setting Values

We can set all the values of the form with `setValue`:

```ts
this.myForm.setValue({
    'username': 'someUsername',
    'email': 'mail@mail.com',
    'hobbies': ['chess']
})
```

We can also `patchValue` in cases when we don't need to set all of the controls:

```ts
this.myForm.patchValue({
    'username': 'someUsername'
})
```

Resetting all inputs:

```ts
this.myForm.reset();
```

::: tip Template-driven
In the template-driven approach, the same methods were available.
:::

### Grouping Inputs

We can nest our inputs in groups:

```ts
this.myForm = new FormGroup({
    'username': new FormControl(null), // initial state will be empty
    'details':new FormGroup({
        'email': new FormControl(null),
        'hobby': new FormControl('chess')
    })
});
```

The HTML would also have to change, it needs to have the group:

```html{10}
<form [formGroup]="myForm" (ngSumbit)="onSubmit()">
    <div>
        <label for="username">Username</label>
        <input
            formControlName="username"
            id="username" 
            type="text">
    </div>

    <div formGroupName="details">
        <div>
            <label for="email">Username</label>
            <input 
                formControlName="email"
                id="email" 
                type="text">
        </div>

        <div *ngFor="let hobby of ['chess', 'dancing', 'movies']">
            <label>
                <input 
                    formControlName="hobby"
                    [value]="hobby" 
                    type="radio">
                {{ hobby }}
            </label>
        </div>
    </div>

    <button type="submit">Sumbit</button>
</form>
```

Additionally, accessing `myForm` needs to reflect the new structure:

```html
<input formControlName="email" id="email" type="text">
<span *ngIf="!myForm.get('details.email').valid">Invalid e-mail</span>
```

### Dynamic Controls

With reactive approach, we can add/remove controls dynamically.

```html
<form [formGroup]="myForm" (ngSumbit)="onSubmit()">
    <div>
        <label for="username">Username</label>
        <input
            formControlName="username"
            id="username" 
            type="text">
    </div>

    <div formArrayName="hobbies">
        <button type="button" (click)="onAddLanguage">Add language</button>

        <input 
            type="text" 
            *ngFor="let hobbyControls of (myForm.get('hobbies') as FormArray).contols; let i = index"
            [formControlName]="i">
    </div>

    <button type="submit">Sumbit</button>
</form>
```

The inputs need to be generated in a loop based on the amount of controls being
added to `hobbies`. Each control will have a name being an index in the array.

```ts
myForm: FormGroup = new FormGroup({
    'username': new FormControl(null),
    'hobbies': new FormArray([]) // we could add some predefined language
})

onAddLanguage() {
    (<FormArray>this.myForm
        .get('hobbies'))
        .push(new FormControl(null)); // newly added language (to be written by the user)
}
```

With that code, the `value` of our `myForm` variable will contain:

- `username` key with a single value;
- `hobbies` key, being an **array** of languages that user added.