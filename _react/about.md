---
title: "UI-Router for React"
layout: single
excerpt: "State based routing for React"
sitemap: true
permalink: /react/
---

{% include toc icon="columns" title="React" %}

<center>
<img src="/images/logos/react.png" width="150">
<br /><img src="https://img.shields.io/npm/v/@uirouter/react.svg?label=@uirouter/react&maxAge=3600">
<br /><iframe style="display: inline-block;" src="https://ghbtns.com/github-btn.html?user=ui-router&repo=react&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe><iframe style="display: inline-block;" src="https://ghbtns.com/github-btn.html?user=ui-router&repo=react&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
</center>

UI-Router provides extremely flexible, state based routing to the React ecosystem.

## Getting UI-Router

The UI-Router package is distributed using [npm](https://www.npmjs.com/), the node package manager.

```
npm install --save ui-router-react
```

## Tutorials

Learn UI-Router by following our tutorials.

- [Hello World](/react/tutorial/helloworld)
- [Hello Solar System](/react/tutorial/hellosolarsystem)
- [Hello Galaxy](/react/tutorial/hellogalaxy)

## Sample application

The [UI-Router Sample App](/resources/sampleapp) is a non-trivial UI-Router application.

## [API Docs](/react/docs/latest)

UI-Router is written in [Typescript](typescriptlang.org).
We generate [detailed API docs](/react/docs/latest) from the typescript code and comments.

## Development

To fix a UI-Router bug, or create an enhancement, follow these steps:

The Typescript source code for UI-Router for React can be found at <https://github.com/ui-router/react>
The React code depends on on UI-Router Core, which is found at <https://github.com/ui-router/core>

To get started you will need to clone the UI-Router Core and UI-Router React repositories.

```
git clone https://github.com/ui-router/core ui-router-core
git clone https://github.com/ui-router/react ui-router-react
```

Then, you will need to build ui-router core and link it locally using `npm link`

```
cd ui-router-core
npm install
npm link
npm run build
```

Then, link to it from the ui-router-react repository

```
cd ../ui-router-react
npm install
npm link ui-router-core
```

To make changes to `ui-router-core` you should run the `npm run watch` script from the `ui-router-core` directory.
This will watch the ui-router core code, compile it, and run the test suite when the core code (or tests) are modified.

```
cd ../ui-router-core
npm run watch
```

