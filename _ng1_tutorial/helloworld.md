---
title: "UI-Router for AngularJS (1.x) - Hello World!"
layout: single
excerpt: "Getting started with UI-Router for AngularJS (1.x)"
sitemap: true
redirect_from: /tutorial/ng1/helloworld/
---

{% include toc icon="columns" title="Hello World!" %}

Let's build a UI-Router for AngularJS Hello World application.
It will have two "pages" (`hello` and `about`), each one having its own URL.
We can switch between pages by clicking on links.
The link for the active page will be highlighted.

# Full Source Code

Start by looking over the complete source code for the Hello World application.
We will go over each part in more detail below.

## `index.html`

```html
<html>
  <head>
    <script src="lib/angular.js"></script>
    <script src="lib/angular-ui-router.js"></script>
    <script src="helloworld.js"></script>

    <style>.active { color: red; font-weight: bold; }</style>
  </head>

  <body ng-app="helloworld">
    <a ui-sref="hello" ui-sref-active="active">Hello</a>
    <a ui-sref="about" ui-sref-active="active">About</a>

    <ui-view></ui-view>
  </body>
</html>
```

## `helloworld.js`

```js
var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});
```

# Live demo

A live demo of the finished app can be seen below, in the [Plunker](https://plnkr.co/).  Navigate between the
"Hello" and "About" links and watch the UI change.

<iframe class="plunker" style="height: 350px" 
  src="//embed.plnkr.co/6eQV15/?show=preview" 
  frameborder="1" allowfullscren="allowfullsceen"></iframe>
<br>

# Building Hello World

Follow these steps to make your own copy of the Hello World app.

## Get UI-Router

Get the UI-Router for AngularJS code using your preferred mechanism:

  - Using npm: `npm install --save @uirouter/angularjs`
  - Using bower: `bower install angular-ui-router`
  - Download directly from [npmcdn](https://unpkg.com/@uirouter/angularjs/release/angular-ui-router.js)

## Add script tags

Add the `angular-ui-router.js` script tag after `angular.js`.
Create a new script `helloworld.js` for the application code and add a script tag.

```html
<head>
  <script src="lib/angular.js"></script>
  <script src="lib/angular-ui-router.js"></script>
  <script src="helloworld.js"></script>
</head>
```

It's important that `angular.js` is loaded before `angular-ui-router.js` (and the `helloworld.js` script).
{: .notice--info}

## Create an Angular module

Add a module in `helloworld.js`

```js
var myApp = angular.module('helloworld', ['ui.router']);
```

We tell Angular that `helloworld` is our main module, and that the `helloworld` module depends on the `ui.router` module.
{: .notice--info}

## Create your first state

A state is the basic building block for UI-Router applications.
This javascript object is a simple state definition.

```js
var helloState = {
  name: 'hello',
  url: '/hello',
  template: '<h3>hello world!</h3>'
}
```

This simple state definition has three properties:

`name`
:    The state is named `hello`.

`url`
:    When the state is active, the browser's url will be `/hello`.

`template`
:    The `template:` string defines the state's view.  When the state is active, this view will be loaded into a viewport.

## Register states

Create another state (`about`).
Register both states with `$stateProvider` in a config block.

```js
myApp.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});
```

Because `$stateProvider` is an [Angular Provider](https://docs.angularjs.org/guide/providers#provider-recipe),
you must inject it into a [`.config()` block](https://docs.angularjs.org/guide/module#configuration-blocks)
using [AngularJS Dependency Injection](https://docs.angularjs.org/guide/di).
{: .notice--info}


## Viewport

Add a `<ui-view>` tag (viewport) to your HTML.

```html
<body ng-app="myApp">
  <ui-view></ui-view>
</body>
```

The `<ui-view>` tag is a UI-Router viewport.
When a state is activated, the state's view (the `template:`) will be loaded into the viewport.
{: .notice--info}

## Links

Add some `ui-sref` links.
When clicked, the links will activate a state.

```html
<body ng-app="myApp">
  <a ui-sref="hello">Hello</a>
  <a ui-sref="about">About</a>

  <ui-view></ui-view>
</body>
```

A `ui-sref` is a directive, and behaves similar to an html `href`.
Instead of referencing a *url* like an `href`, it references a *state*.
The `ui-sref` directive automatically builds a `href` attribute for you (`<a href=...></a>`) based on your state's url.
{: .notice--info}

## Active link

Add `ui-sref-active="active"` to the `ui-sref` links.
This directive will add the `active` css class to the link when the target state is active.

```html
<body>
  <a ui-sref="hello" ui-sref-active="active">Hello</a>
  <a ui-sref="about" ui-sref-active="active">About</a>

  <ui-view></ui-view>
</body>
```

Finally, add the style tag and the `.active` class to style the active link as red and *bold*.

```html
<head>
  ...
    <style>.active { color: red; font-weight: bolder; }</style>
</head>
```

Go back to the [live demo](#live-demo) and check it out!

When you're finished, move on to the [Hello Solar System!](hellosolarsystem) tutorial.

