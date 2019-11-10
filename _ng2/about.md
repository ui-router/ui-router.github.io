---
title: "UI-Router for Angular (2+)"
layout: single
excerpt: "State based routing for Angular (2+)"
sitemap: true
permalink: /ng2/
---
{% include toc icon="columns" title="Angular (2+)" %}

<center>
<img src="/images/logos/angular2.png">
<br /><img src="https://img.shields.io/npm/v/@uirouter/angular.svg?label=@uirouter/angular&maxAge=3600">
<br /><iframe style="display: inline-block;" src="https://ghbtns.com/github-btn.html?user=ui-router&repo=ng2&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe><iframe style="display: inline-block;" src="https://ghbtns.com/github-btn.html?user=ui-router&repo=ng2&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
</center>

UI-Router provides extremely flexible, state based routing to the Angular (2+) ecosystem.

## Getting UI-Router

The UI-Router package is distributed using [npm](https://www.npmjs.com/), the node package manager.

```
npm install @uirouter/angular
npx check-peer-dependencies --install
```

Other examples:

- Adding a specific version to your project: `npm install --save @uirouter/angular@1.0.0-beta.7`
- From <http://unpkg.com> via a `<script>` tag in your html: 
  - Latest stable version: `<script src="//unpkg.com/@uirouter/angular/_bundles/ui-router-ng2.js"></script>`
  - A specific version: `<script src="//unpkg.com/@uirouter/angular@1.0.0-beta.7/_bundles/ui-router-ng2.js"></script>`

## Tutorials

Learn UI-Router by following our tutorials.

- [Hello World](/ng2/tutorial/helloworld)
- [Hello Solar System](/ng2/tutorial/hellosolarsystem)
- [Hello Galaxy](/ng2/tutorial/hellogalaxy)
 
## Quick Start
 
The [UI-Router Ng2 QuickStart](https://github.com/ui-router/quickstart-angular) is a minimalistic Angular (2+) UI-Router app generated with [Angular CLI](https://github.com/angular/angular-cli).
It demonstrates:

- States and nested substates
- Path, Query, and Hash parameters
- Resolve data
- Named Views

## Sample application

The [UI-Router Sample App](/resources/sampleapp) is a non-trivial UI-Router application.
 
## Development

To fix a UI-Router bug, or create an enhancement, follow these steps: 

The Typescript source code for UI-Router for Angular (2+) can be found at <https://github.com/ui-router/ng2>
UI-Router for Angular (2+) depends on UI-Router Core, which can be found at <https://github.com/ui-router/core>

To get started:

```
mkdir uirouter
cd uirouter
git clone https://github.com/ui-router/angular
git clone https://github.com/ui-router/core
cd core
npm install
npm link
npm run build

cd ../angular
npm install
npm link @uirouter/core
npm run build
```

