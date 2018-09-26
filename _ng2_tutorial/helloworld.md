---
title: "UI-Router for Angular (2+) - Hello World!"
layout: single
excerpt: "Getting started with UI-Router for Angular (2+)"
sitemap: true
redirect_from: /tutorial/ng2/helloworld/
---

{% include toc classes="collapsible" icon="columns" title="Hello World!" %}

Let's build a Hello World UI-Router application for Angular (2+).
It will have two "pages" (`hello` and `about`), each one having its own URL.
We can switch between pages by clicking on links.
The link for the active page will be highlighted.

# Full Source Code

An Angular (2+) Hello World app is a bit more complex to set up than an AngularJS or React Hello World App.
We're going to use the [Angular (2+) Plunker template](http://plnkr.co/edit/tpl:AvJOMERrnz94ekVua0u5) as starting point.

Start by looking over the complete source code (ignoring SystemJS `config.js`) for the Hello World application.
We will go over each part in more detail below.

## `index.html`

```html
<html>
  <head>
    <script src="https://unpkg.com/zone.js@0.6.23/dist/zone.js"></script>
    <script src="https://unpkg.com/reflect-metadata@0.1.3/Reflect.js"></script>
    <script src="https://unpkg.com/systemjs@0.19.31/dist/system.js"></script>
    <script src="https://unpkg.com/typescript@1.8.10/lib/typescript.js"></script>
    <script src="config.js"></script>
    <script>
      System.import('helloworld').catch(console.error.bind(console)); 
    </script>
    
    <style>.active { color: red; font-weight: bold; }</style>
  </head>

  <body>
    <my-app>
      Loading...
    </my-app>
  </body>

</html>
```

## `helloworld.ts`

{% raw %}
```js
/** imports */

import {NgModule, Component} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UIRouterModule} from "@uirouter/angular";

/** Components */

@Component({
  selector: 'my-app',
  template: `
  <a uiSref="hello" uiSrefActive="active">Hello</a>
  <a uiSref="about" uiSrefActive="active">About</a>
  
  <ui-view></ui-view>
  `
})
export class App { }

@Component({  
  template: '<h3>Hello world!</h3>' 
})
class Hello { }

@Component({ 
  template: '<h3>Its the UI-Router hello world app!</h3>' 
})
class About { }


/** States */

let helloState = { name: 'hello', url: '/hello',  component: Hello }; 
let aboutState = { name: 'about', url: '/about',  component: About };

/** Root Application NgModule */

@NgModule({
  imports: [ 
    BrowserModule,
    UIRouterModule.forRoot({ states: [ helloState, aboutState ], useHash: true })
  ],
  declarations: [ App, Hello, About ],
  bootstrap: [ App ]
})
class RootAppModule {}

/** Angular (2+) bootstrap */

platformBrowserDynamic().bootstrapModule(RootAppModule);
```
{% endraw %}

# Live demo

A live demo of the finished app can be seen below, in the [Plunker](https://plnkr.co/).
Navigate between the "Hello" and "About" links and watch the UI change.

<iframe class="plunker" style="height: 350px" 
  src="//embed.plnkr.co/emMpITE71x5kYrXmZ5Vw/?show=preview" 
  frameborder="1" allowfullscren="allowfullsceen"></iframe>
<br>

# Prepping Hello World

Follow these steps to make your own copy of the Hello World app.

## Get UI-Router

Get the UI-Router for Angular (2+) code using npm

```
npm install @uirouter/angular
```

You could alternatively refer to the 
[copy distributed on unpkg.com](https://unpkg.com/@uirouter/angular@latest/_bundles/ui-router-ng2.js).
(This is how the live demo plunkers function)

## Configure your module loader

Angular (2+) development requires a module loader and is best with a bundler, such as webpack.
For these tutorials, however, we're going to use SystemJS and the individual UMD Angular (2+) bundles.

**SystemJS config.js**

The `map` section of `config.js` tells the System loader where to look for things.
Add an entry for `@uirouter/angular` nd `@uirouter/core` in the `map:` section.
This entry must allow us to `import from '@uirouter/angular'` and get the `@uirouter/angular`
library entry point (`main:` from `package.json`).

Add a second second entry for `helloworld` which will get us the helloworld app entry point.

```js
...
  map: {
    // ... angular 2 stuff
    'rxjs': 'https://unpkg.com/rxjs@5.0.0-beta.12',
    '@uirouter/angular': 'https://unpkg.com/@uirouter/angular@1.0.0-beta.7/_bundles/ui-router-ng2.js',
    '@uirouter/core': 'https://unpkg.com/@uirouter/core@5.0.5/_bundles/ui-router-core.js',
    'helloworld': "./helloworld.ts"
  },
...
```

SystemJS is a complex, nuanced topic, but this is as far as we're going to discuss for this tutorial.
For production, we recommend using a bundler such as webpack which understands node module resolution.

## Script tags

The scripts loaded from unpkg are prerequisites for Angular2 + Typescript running in a plunker.

The `config.js` script is our SystemJS configuration.

```html
  <head>
    <script src="https://unpkg.com/zone.js@0.6.23/dist/zone.js"></script>
    <script src="https://unpkg.com/reflect-metadata@0.1.3/Reflect.js"></script>
    <script src="https://unpkg.com/systemjs@0.19.31/dist/system.js"></script>
    <script src="https://unpkg.com/typescript@1.8.10/lib/typescript.js"></script>
    <script src="config.js"></script>
    ...
```

## Bootstrapping the javascript
This script tells the module loader to load `helloworld`, which is our application's entry point.

```html
    <script>
      System.import('helloworld').catch(console.error.bind(console)); 
    </script>
```

# Building Hello World

## ES6 imports

In order to access the code required to bootstrap Angular (2+) and UI-Router, we need to import a bunch of things.

```js
import {NgModule, Component} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UIRouterModule} from "@uirouter/angular";
```

## Creating the components

Create the Angular (2+) components that make up our application.

**The `hello` and `about` components**

Create two components for our two "pages".

```js
@Component({  
  template: '<h3>Hello world!</h3>' 
})
class Hello { }

@Component({ 
  template: '<h3>Its the UI-Router hello world app!</h3>' 
})
class About { }
```

These two simple components make up the two pages of our application.
One of these components will be shown, when its cooresponding state is active.

**The root component**

The `MyApp` component will be the root of the application component tree.
This is the component that we will bootstrap with Angular (2+) as the root of our application.

```js
@Component({
  selector: 'my-app',
  template: `
  <a uiSref="hello" uiSrefActive="active">Hello</a>
  <a uiSref="about" uiSrefActive="active">About</a>
  
  <ui-view></ui-view>
  `
})
class MyApp { }
```

*Viewport*

The MyApp component contains a `<ui-view>` viewport.
The `<ui-view>` viewport will be filled with the component from the currently active state.

*Links*

It also contains two anchor tags with `uiSref` directives.
The `uiSref` directives are links, similar to an anchor tag's `href`.
Instead of linking to a URL like an `href`, a `uiSref` links to a state.
  
When clicked, the linked state is activated.
The `uiSref` directive automatically builds a `href` attribute for you (`<a href=...></a>`) based on your state's url.

*Active Link*

The `uiSref` links also have `uiSrefActive='active'`, which is another directive. 
The addition of `uiSrefActive='active'` adds the `active` css class to the link when the target state is active.

## Instantiating the root component

Inside the `<body>` tag, we add markup for our application's root Component.
Angular (2+) applications are a tree of components and `<my-app>` is the root of that tree.

```html
  <body>
    <my-app>
      Loading...
    </my-app>
  </body>
```

## Create your first states

A state is the basic building block for UI-Router applications.
This javascript object is a simple state definition.

```js
let helloState = { name: 'hello', url: '/hello',  component: Hello }; 
```

This simple state definition has three properties:

`name`
:    The state is named `hello`.

`url`
:    When the state is active, the browser's url will be `/hello`.

`component`
:    The `component:` property value is the Angular (2+) component class that will be loaded into the viewport when the state is active.  In this case, we will load the `Hello` component.

Add the 'about' state:

```js
let helloState = { name: 'hello', url: '/hello',  component: Hello }; 
let aboutState = { name: 'about', url: '/about',  component: About };
```

## Create the root `NgModule`

Angular (2+) requires that you define a `NgModule` to bootstrap your application.

```js
@NgModule({
  imports: [ 
    BrowserModule,
    UIRouterModule.forRoot({ states: [ helloState, aboutState ], useHash: true })
  ],
  declarations: [ App, Hello, About ],
  bootstrap: [ App ]
})
class RootAppModule {}
```

`imports: [ BrowserModule, UIRouterModule.forRoot({ ...`
:   Allows your app's module to use code from another module.
    In this example, `UIRouterModule.forRoot` creates a UI-Router module, and registers the states listed.
    The `BrowserModule` contains built-in Angular (2+) directives like `ngFor`.
    
`declarations: [ App, Hello, About ]`
:   Declares all components used in the root module.

`bootstrap: [ App ]`
:   Tells Angular (2+) to bootstrap the `App` component as the root of the application.

## Bootstrapping Angular (2+)

Bootstrap Angular (2+) with the `RootAppModule` NgModule.

```js
platformBrowserDynamic().bootstrapModule(RootAppModule);
```

---

Go back to the [live demo](#live-demo) and check it out!

When you're finished, move on to the [Hello Solar System!](hellosolarsystem) tutorial.

