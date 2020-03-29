---
title: "UI-Router for React - Hello World!"
excerpt: "Getting started with UI-Router for React"
layout: single
sitemap: true
redirect_from: /tutorial/react/helloworld/
---

{% include toc icon="columns" title="Hello World!" %}

Below is the "Hello World" UI-Router application for React.
It has two "pages" (`hello` and `about`), each one having its own URL.
We can switch between pages by clicking on links.
The link for the active page will be highlighted.

# Live demo

A live demo of the finished app can be seen below.
Navigate between the "Hello" and "About" links and watch the UI change.

<iframe class="plunker" style="height: 350px" 
  src="//stackblitz.com/edit/uirouter-react-hello-world?embed=1&file=src/index.js&view=preview" 
  frameborder="1" allowfullscren="allowfullsceen"></iframe>
<br>

You may also [open our live demo on Stackblitz](//stackblitz.com/edit/uirouter-react-hello-world).

# Full Source Code

Start by looking over the complete source code for the Hello World application.
We will go over each part in more detail below.

```js
import React from "react";
import ReactDOM from "react-dom";
import { UIRouter, UIView, useSrefActive, pushStateLocationPlugin } from "@uirouter/react";
import("./style.css");

const Hello = () => <h3>hello world</h3>;
const About = () => <h3>Its the UI-Router hello world app!</h3>;

const App = () => {
  const activeClass = "active";
  const helloSref = useSrefActive("hello", null, activeClass);
  const aboutSref = useSrefActive("about", null, activeClass);

  return (
    <div>
      <a {...helloSref}>Hello</a>
      <a {...aboutSref}>About</a>
      <UIView />
    </div>
  );
};

const helloState = { name: "hello", url: "/hello", component: Hello };
const aboutState = { name: "about", url: "/about", component: About };

ReactDOM.render(
  <UIRouter 
    plugins={[pushStateLocationPlugin]} 
    states={[helloState, aboutState]}>
    <App/>
  </UIRouter>,
  document.getElementById("root")
);

```

# Building Hello World

## ES6 imports

In order to access the code required to bootstrap React and UI-Router, we need to import a bunch of things.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { UIRouter, UIView, useSrefActive, pushStateLocationPlugin } from "@uirouter/react";
```

## Creating the components

**The `Hello` and `About` components**

```js
const Hello = () => <h3>hello world</h3>;
const About = () => <h3>Its the UI-Router hello world app!</h3>
```

These two stateless components make up the two pages of our application.
One of these components will be rendered when its corresponding state is active.

*Viewport*

The application contains a `<UIView>` viewport.
The `<UIVIew>` viewport will be filled with the component from the currently active state.

*Links*

A link to a state is created using an `sref`, which is a State Reference (similar to an `href`).

In this example, we create an `sref` using the `useSrefActive` react hook.

```js 
const helloSref = useSrefActive('hello', null, 'active');
```

The object returned from `useSrefActive` contains three props:
 
  - an `href` to the state
  - an `onClick` handler which activates the linked state
  - an active `className` (only when the link is active)
  
These props can be applied to an anchor tag using prop spreading:

```js
const helloSref = useSrefActive('hello', null, 'active');
const link = <a {...helloSref}>Hello</a>;
```

When the anchor is clicked, the `onClick` handler will activate the `hello` state.
When the `hello` state is activated, the anchor tag's `className` will be `active`.

## Create your first states

A state is the basic building block for UI-Router applications.
This javascript object is a simple state definition.

```js
const helloState = { name: 'hello', url: '/hello',  component: Hello };
```

This simple state definition has three properties:

`name`
:    The state is named `hello`.

`url`
:    When the state is active, the browser's url will be `/hello`.

`component`
:    The `component:` property value is the React component that will be loaded into the viewport when the state is active.  In this case, we will load the `Hello` component.

Add the other about state:

```js
let helloState = { name: 'hello', url: '/hello',  component: Hello };
let aboutState = { name: 'about', url: '/about',  component: About };
```

## Configure and start UIRouter

The `<UIRouter>` component takes care of initializing the router for us, but we have to provide some basic configuration.

```js
<UIRouter 
  plugins={[pushStateLocationPlugin]} 
  states={[helloState, aboutState]}
>
  <App/>
</UIRouter>
```

The `plugins` prop lets us extend UI-Router basic functionalities.
Providing a *location plugin* is necessary in order for the router to work.
In this case `pushStateLocationPlugin` tells the router to interact with the browser url via the `pushState` API.

The `states` prop is a handy way to quickly register router states right after it has been initialized.
It's not the only way to register states, but it's the easiest and preferred one.

The application's root component is rendered as a child of the `<UIRouter>` component.

## Bootstrapping React

Bootstrap React.

```js
ReactDOM.render(
  <UIRouter 
    plugins={[pushStateLocationPlugin]}
    states={[helloState, aboutState]}
  >
    <App/>
  </UIRouter>,
  document.getElementById('root');
);
```

---

Go back to the [live demo](#live-demo) and check it out!

When you're finished, move on to the [Hello Solar System!](hellosolarsystem) tutorial.

