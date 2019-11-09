---
title: "UI-Router for Angular - Hello World!"
layout: single
excerpt: "Getting started with UI-Router for Angular"
sitemap: true
redirect_from: /tutorial/ng2/helloworld/
---

{% include toc classes="collapsible" icon="columns" title="Hello World!" %}

Below is the "Hello World" UI-Router application for Angular.
It has two "pages" (`hello` and `about`), each one having its own URL.
We can switch between pages by clicking on links.
The link for the active page will be highlighted.

# Live demo

A live demo of the finished app can be seen below.
Navigate between the "Hello" and "About" links and watch the UI change.

<iframe class="plunker" style="height: 350px" 
  src="//stackblitz.com/edit/uirouter-angular-hello-world?embed=1&file=src/main.ts&view=preview" 
  frameborder="1" allowfullscren="allowfullsceen"></iframe>
<br>

You may also [open our live demo on Stackblitz](//stackblitz.com/edit/uirouter-angular-hello-world).

# Explaining Hello World

The entire Typescript source code for Hello World is shown here.
We will explain each section of code below.

{% raw %}
```js
import './polyfills';

/** imports */

import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { UIRouterModule } from "@uirouter/angular";

/** Components */

@Component({
  selector: "my-app",
  styles: [".active { font-weight: bold } a + a { margin-left: .5em; }"],
  template: `
    <a uiSref="hello" uiSrefActive="active">Hello</a>
    <a uiSref="about" uiSrefActive="active">About</a>

    <ui-view></ui-view>
  `
})
export class App {}

@Component({
  template: "<h3>Hello world!</h3>"
})
class Hello {}

@Component({
  template: "<h3>Its the UI-Router hello world app!</h3>"
})
class About {}

/** States */

const helloState = { name: "hello", url: "/hello", component: Hello };
const aboutState = { name: "about", url: "/about", component: About };

/** Root Application NgModule */

@NgModule({
  imports: [
    BrowserModule,
    UIRouterModule.forRoot({ states: [helloState, aboutState], useHash: true })
  ],
  declarations: [App, Hello, About],
  bootstrap: [App]
})
class RootAppModule {}

/** Angular bootstrap */

platformBrowserDynamic().bootstrapModule(RootAppModule).then(ref => {
  // Ensure Angular destroys itself on stackblitz hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
```
{% endraw %}

# Code explanation

## ES6 imports

In order to bootstrap the app, we imported a few things from Angular and UIRouter.

```js
import {NgModule, Component} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UIRouterModule} from "@uirouter/angular";
```

## Angular Components

*The root component*

The `AppRoot` component will be the root of the application component tree.
We will tell Angular to bootstrap our app with this component later.

```js
@Component({
  selector: "my-app",
  styles: [".active { font-weight: bold } a + a { margin-left: .5em; }"],
  template: `
    <a uiSref="hello" uiSrefActive="active">Hello</a>
    <a uiSref="about" uiSrefActive="active">About</a>

    <ui-view></ui-view>
  `
})
export class AppRoot {}
```

The `my-app` selector matches the `<my-app>loading</my-app>` html tag which Stackblitz added for us in `index.html`.

*Viewport*

The `AppRoot` component contains a `<ui-view>` viewport.
This viewport will be filled with the component from the currently active state.

*Links*

The component also contains two anchor tags, each containing a `uiSref` directive.
The `uiSref` directives are links, similar to an anchor tag's `href`.
Instead of linking to a URL like an `href` does, a `uiSref` links to a state.
  
When clicked, the linked state is activated.
The `uiSref` directive automatically builds a `href` attribute for you (`<a href=...></a>`) based on your state's url.

*Active Link Indicator*

The `uiSref` links also have `uiSrefActive='active'` (which is another UIRouter directive).
When the state that the `uiSref` links to is active, `uiSrefActive` will add the `active` CSS class to the link.
In the demo, this makes the link **BOLD**.

**The `Hello` and `About` components**

These two simple components make up the two pages of our application.
The router will fill the viewport with one of these components as you navigate between states.

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

## The UI-Router states

A state is the basic building block for UI-Router applications.
We define two states: `helloState` and `aboutState`.

```js
const helloState = { name: 'hello', url: '/hello',  component: Hello }; 
const aboutState = { name: 'about', url: '/about',  component: About };
```

Each of these state objects have three properties:

`name`
:    The state is named `hello` or `about`.

`url`
:    When the `hello` state is active, the browser's url will be `/hello`.

`component`
:    When the `hello` state is active, the `Hello` Angular component will be loaded into the `ui-view` viewport.

## The root `NgModule`

Angular requires that you define a root `NgModule` to bootstrap your application.

```js
@NgModule({
  imports: [ 
    BrowserModule,
    UIRouterModule.forRoot({ states: [ helloState, aboutState ], useHash: true })
  ],
  declarations: [ AppRoot, Hello, About ],
  bootstrap: [ AppRoot ]
})
class RootAppModule {}
```

`imports: [ BrowserModule, UIRouterModule.forRoot({ ...`
:   Allows your app's module to use code from another module.
    In this example, `UIRouterModule.forRoot` imports the UI-Router module, and registers the states listed.
    The `BrowserModule` contains built-in Angular directives like `ngFor`.
    
`declarations: [ AppRoot, Hello, About ]`
:   Declares all components used in the root module.

`bootstrap: [ AppRoot ]`
:   Tells Angular to bootstrap the `AppRoot` component as the root of the application.

## Bootstrapping Angular

Bootstrap Angular with the `RootAppModule` NgModule.

```js
platformBrowserDynamic()
  .bootstrapModule(RootAppModule)
  .catch(err => console.error(err));
```

---

Go back to the [live demo](#live-demo) and play around with it!

When you're finished, move on to the [Hello Solar System!](hellosolarsystem) tutorial.

