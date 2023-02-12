---
title: GJS
description: Building GTK 4 applications with JavaScript
tags: gtk, adwaita, gjs, linux
lang: en-US
---

# GJS

One of the ways to code GTK apps is using JavaScript. The
[GJS](https://gjs.guide/) project enables that via bindings to various Gnome
libraries (GTK being just one of them).

The code execution is handled by the Mozilla SpiderMonkey engine, which is a
JavaScript engine, just like V8 is one. It means that we can use pretty much the
latest ECMAScript features in our GTK apps. 

## App Dependencies

JS developers are used to pulling dependencies from
[npm](https://www.npmjs.com/). The bad news is that many of tha packages there
will not work, simply because they rely on Node.js APIs, which are not there in
GJS. However, there are also a bunch of libraries that do work, as long as they
do not call any Node.js functions.

GJS, as a language binding for the Gnome ecosystem, enables the use of
GObject-based libraries. The full list of APIs and their documentation may be
found at [GJS API Docs](https://gjs-docs.gnome.org).

## Dev Dependencies

To build GJS apps we need:

- `gjs` (comes with gnome)
- Flatpak Builder - `flatpak install org.flatpak.Builder`
- Gnome Builder IDE - `flatpak install flathub org.gnome.Builder`

::: tip App ID
Flatpak and Gnome Platform both make use of reverse DNS naming
system. More on that
[here](https://developer.gnome.org/documentation/tutorials/application-id.html).
:::

## Commands

Building the app:

```sh
flatpak run org.flatpak.Builder --force-clean --user --install build-dir com.marcinjahn.my-app.yml
```

Running the app:

```sh
flatpak run com.marcinjahn.my-app
```

## JS Code

### Imports

We can use the ECMAScript import syntax:

```js
import GLib from 'gi://GLib';
```

We can also specify the exact version of the library we're imporing:

```js
import 'gi://Gtk?version=4.0'; // GTK 4.0
import GLib from 'gi://GLib'; // latest version available?
```

### This

There is a global object called `globalThis`, which is similar to `window` in
the browsers. We can assign values to it and access them from anywhere else.

## Files

Our app will consist of:

- JS code (duh..):
    - Entry Point (`app.id.js`) - starting point of the app.

        Example:

        ```js
        // all the "@X" things are placeholders for meson to fill in
        #!@GJS@ -m

        import GLib from 'gi://GLib';

        // package is GJS module for initializing and running the app
        imports.package.init({
            name: '@PACKAGE_NAME@',
            version: '@PACKAGE_VERSION@',
            prefix: '@PREFIX@',
            libdir: '@LIBDIR@',
        });

        // Import the main module and run the main function
        const loop = new GLib.MainLoop(null, false);
        import('resource:///com/marcinjahn/my-app/js/main.js') // GResource path
            .then((main) => {
                GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
                    loop.quit(); // kill the main loop and let the main.js take over
                    imports.package.run(main);
                    return GLib.SOURCE_REMOVE;
                });
            })
            .catch(logError);
        loop.run(); // starts the loop to keep the app running until main.js is loaded
        ```

    - `window.js` - an app typically subclasses a base `GtkWindow` to define
      code and UI of a window

        ```js
        export const MyWindow = GObject.registerClass({
            GTypeName: 'MyWindow',
            Template: 'resource:///com/marcinjahn/my-app/ui/Window.ui',
            InternalChildren: ['viewStack'],
        }, class extends Gtk.ApplicationWindow {
            constructor(params={}) {
                super(params);
            }
            
            vfunc_close_request() {
                super.vfunc_close_request();
                this.run_dispose(); // why?
            }
        });
        ```

    - `application.js` - an app typically subclasses a base `GtkApplication`:

    ```js
    export const MyApplication = GObject.registerClass({
        GTypeName: 'MyApplication'
    }, class extends Gtk.Application {
        vfunc_activate() {
            const window = new Window({ application: this });
            window.present();
        }

        vfunc_startup() {
            super.vfunc_startup();
            this.#loadStylesheet();
        }

        /**
         * This is how we can enable CSS files
         */
        #loadStylesheet() {
            // Load the stylesheet in a CssProvider
            const provider = new Gtk.CssProvider();
            provider.load_from_resource('/com/marcinjahn/filebrowser/css/style.css');

            // Add the provider to the StyleContext of the default display
            Gtk.StyleContext.add_provider_for_display(
                Gdk.Display.get_default(),
                provider,
                Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
            );
        }
    });
    ```
    
    - `main.js` - most likely, you will instantaite the app here:

        ```js
        import 'gi://Gdk?version=4.0';
        import 'gi://Gtk?version=4.0';

        import { MyApplication } from './application.js';

        export function main(argv) {
            return new MyApplication({ 'application-id': pkg.name }).run(argv);
        }
        ```

- [GResource](https://docs.gtk.org/gio/struct.Resource.html) - an XML listing of
  files that will be included in the final binary. Usually, there are separate
  GResource file for the source code, and for the other data (images, CSS, UI,
  icons, etc.). There are APIs to access GResources (like icons) from the JS
  code.

    Example:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <gresources>
        <gresource prefix="/com/marcinjahn/my-app">
            <file>data/splashscreen.png</file>
            <file compressed="true">dialog.ui</file>
            <file preprocess="xml-stripblanks">menumarkup.xml</file>
            <file alias="example.css">data/example.css</file>
        </gresource>
    </gresources>
    ```

- assets like icons, images
- CSS - GTK apps may be styles with CSS, similar to HTML. The difference is that
  GTK CSS does not support positioning (e.g. with flexbox). That is done via
  specific widget containers, similarly to how WPF does it in the .NET Platform.
- UI files - XML describing the layout of various views, very similar to WPF.
- [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
- meson build file(s)

## Widgets

GTK toolkit wouldn't be of much use without its widgets. Their documenatation
can be found [here](https://docs.gtk.org/gtk4/visual_index.html).

Widgets have a tree of inheritance (`GObject` is always a root), making the
whole thing very similar to WPF.

Widgets include also layout containers, which help with positioning of other
widgets on the screen. In web development, we'd typically use CSS for that. In
GTK, widgets are the way to do it.

Widgets may be placed on the screen in two ways:

- in JS code

    ```js
        const window = new Gtk.ApplicationWindow({ application: this });
        const label = new Gtk.Label({ label: 'Hello World!' });
        window.child = label;
        window.present();
    ```

- in UI file

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <interface>
        <template class="MyWidget">
            <property name="layout-manager">
                <object class="GtkBoxLayout">
                    <property name="orientation">vertical</property>
                </object>
            </property>
            <child>
                <object class="GtkLabel" id="myLabel">
                    <property name="label" 
                        bind-source="MyWidget" 
                        bind-property="my-text" 
                        bind-flags="sync-create"/>
                    <property name="wrap">true</property>
                    <property name="justify">center</property>
                </object>
            </child>
        </template>
    </interface>
    ```

    The XML above also shows an example of binding.

    A UI file like this needs its own class to be defined in JS as well:

    ```js
    export const MyWidget = GObject.registerClass({
        GTypeName: 'MyWidget',
        Template: 'resource:///com/marcinjahn/my-app/ui/MyWidget.ui', // link to the UI file above
        CssName: 'my-app', // we can style the widget with this identifier
        Properties: {
            WelcomeText: GObject.ParamSpec.string(
                'my-text', // name
                'My Text', // nick
                'The text displayed by the widget', // blurb
                GObject.ParamFlags.READWRITE, // flags
                '' // default value
            ),
        }
        InternalChildren: ['myLabel'], // similar to Angular's @ViewChild
    }, class extends Gtk.Widget {
        get welcomeText() {

            return this._myText || ''; 
        }

        set welcomeText(value) {
            // Do nothing if the new value is the same as the old one
            if (this._myText === value)
                return;
            // Store the value in an internal property
            this._myText = value;
            // Hide the label if no text is set
            this._myText.visible = !!value;
            // Notify that the value has changed
            this.notify('my-text');
        }
        
    });
    ```

### Properties

Our widgets may have their own properties, and we might set them in UI files of
the widget. These properties are similar to [Angular's
@Inputs](/programming/angular/components.md#inputs).

```js
export const MyWidget = GObject.registerClass({
	GTypeName: 'MyWidget',
	Template: 'resource:///com/marcinjahn/my-app/ui/MyWidget.ui',
	Properties: {
		MyText: GObject.ParamSpec.string(
			'my-text', // name
			'My Text', // nick
			'The text displayed by the widget', // blurb
			GObject.ParamFlags.READWRITE, // flags
			'' // default value
		),
	},
}, class extends Gtk.Widget {});`
```

We can bind to that property from a UI file like this:

```xml
<object class="GtkLabel" id="myLabel">
    <property name="label" 
        bind-source="MyWidget"
        bind-property="my-text"
        bind-flags="sync-create"/>
    <property name="wrap">true</property>
    <property name="justify">center</property>
</object>
```

Then, when some parent widget displays `MyWidget`, it can set the value of the
property, like this:

```xml
<object class="MyWidget">
	<property name="my-text">A new value</property>
	<!-- ... -->
</object>
```

### CSS

We can create our own CSS classes to style widgets, and we can use already
existing classes, which come with the GTK widgets. Documentation of GTK
specifies these classes under "CSS Nodes" section of each widget. For example, a
[Label](https://docs.gtk.org/gtk4/class.Label.html) widget has a node `label`
with the following classes:

- `.selection` - when selected
- `.link` - for each URL included in the label's text

Also, GTK defines a bunch of classes that we can freely apply to various
widgets. For example, the `.keycap` class makes label look like a keyboard key.

### Signals

`GObject` brings over the concept of *Signals*, which analogical to events from
the .NET world. Various widgets have their own signals defined (like a `clicked`
signal of a button), which we can subscribe and react to. Custom widgets also
can have custom signals defined.

Her's how to use a signal:

Connecting to a signal

```xml
<object class="GtkButton">
	<!-- ... -->
	<signal name="clicked" handler="onButtonClicked"/>
</object>
```

Defining the handler:

```js
class MyWidget extends Gtk.Widget {
	/* ... */

	onButtonClicked(_button) {
		console.log('Button clicked!');
	}
}
```

Some signals have additional parameters that can be used in handlers. The first
parameter is always the object emitting it.

#### Custom Signals

In order to define our own signals, we have to:

1. Specify the signal to be a part of our widget:

    ```js
    export const WelcomeWidget = GObject.registerClass({
        /* ... */
        Signals: {
            'user-added': {},
        },
    }, class MyWidget extends Gtk.Widget {/* ... */})
    ```

2. Emit it

    ```js
    this.emit('user-added');
    ```

The parent of the widget with our signal may subscribe to it via the UI file, as
shown before, or in code:

```js
const widget = new MyWidget();

// Connecting to the signal
const handlerId = widget.connect('user-added', (example) => {
    log('user-added received');
});

widget.emit('user-added');

// Disconnecting the signal
widget.disconnect(handlerId);
```

::: tip Advanced Options 
There's a bunch of configuration that can be applied to signals, all of it is
described in the [GJS
Guide](https://gjs.guide/guides/gobject/subclassing.html#signals).
:::

## Actions

Relying on signals too much can quickly bring us at the similar problem that we
have in web frameworks with bubbling signals/events up the components tree - it
becomes cumbersome.

This is why GTK defines another concept - **Actions**. These are defined in once
place and can be called from another (even from another app!).

If an Action is defined on a Window, any widget within that window can invoke
it. If an Action is defined on an Application, we can call it from anywhere. It
is kind of like a global function. Individual widgets can also add actions (and
then, who can call them?)

### Custom Action

Defining an Action:

```js
class MyWindow extends Gtk.ApplicationWindow {
	constructor(params={}) {
		super(params);
		this.#setupActions();
	}

	#setupActions() {
		const myAction = new Gio.SimpleAction({
			name: 'my-action',
			parameterType: GLib.VariantType.new('s'), // string
		});

        // the actual thing to do
		myAction.connect('activate', (_action, params) => {
			const parameter = params.unpack();
            // do something...
		});

		// Add the action to the window
		this.add_action(myAction);
	}
}
```

Activating an Action:

We can either do it in code with the `gtk_widget_activate_action()` function of
any widget, or in the UI file, with a button:

```xml
<object class="GtkButton">
	<property name="action-name">win.my-action</property>
	<property name="action-target">'abc'</property>
	<!-- ... -->
</object>
```

::: tip Actionable interface
The `GtkButton` can invoke actions directly, because it implements the
[Actionable](https://docs.gtk.org/gtk4/iface.Actionable.html) interface. Other
kinds of button also do.
:::

::: tip Action Group
During invocation, the action is prefixed with the name of its group. For Window
actions, it's "win", for Application it's "app".
:::

## Application Settings

The [Gio.Settings](https://docs.gtk.org/gio/class.Settings.html) (*GSettings*)
may be used to
store the app's settings.

::: danger User Data
Don't store users' data with `Gio.Settings`. There are better options for it.
:::

GSettings stores values as `GVariant`, with any type. GSettings can be bound to
a widget, making changes to settings automatic with the UI.

Settings of our app should have a predefined schema, in XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<schemalist>
	<schema id="com.marcinjahn.my-app" path="/com/marcinjahn/my-app/">
		<key name="window-width" type="i">
			<default>-1</default>
		</key>
		<key name="window-height" type="i">
			<default>-1</default>
		</key>
		<key name="advanced-view" type="b">
			<default>false</default>
		</key>
	</schema>
</schemalist>
```

This should be defined in a file named like
`com.marcinjahn.filebrowser.gschema.xml`.

Now, we can use settings in various ways:

- bind to them in our widgets

    ```js
    settings.bind('window-width', this, 'default-width', Gio.SettingsBindFlags.DEFAULT);
    settings.bind('window-height', this, 'default-height', Gio.SettingsBindFlags.DEFAULT);
    ```

    ::: tip Global Settings
    In this case, we can access GSettings via `settings`, because this variable
    was added to global object in the Application class with:
    
    ```js
    globalThis.settings = new Gio.Settings({ schemaId: this.applicationId });
    ```
    :::

- read a setting

    ```js
    const advanced = settings.get_boolean('advanced-view');
    ```

- subscribe to changes

    ```js
    settings.connect('changed::advanced-view', settings => {
        // Do somethig...
    });
    ```

## References

This "guide" has been heavily inspired by the [GJS & GTK 4
tutorial](https://rmnvgr.gitlab.io/gtk4-gjs-book).
It also contains a bunch of information taken from:

- [GJS Guide](https://gjs.guide)
