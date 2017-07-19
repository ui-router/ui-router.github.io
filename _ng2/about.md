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
<br /><iframe style="display: inline-block;" src="https://ghbtns.com/github-btn.html?user=ui-router&repo=ng2&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe><iframe style="display: inline-block;" src="https://ghbtns.com/github-btn.html?user=ui-router&repo=ng2&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
</center>

UI-Router provides extremely flexible, state based routing to the Angular (2+) ecosystem.

## Getting UI-Router

The UI-Router package is distributed using [npm](https://www.npmjs.com/), the node package manager.

```
npm install --save ui-router-ng2
```

Other examples:

- Adding a specific version to your project: `npm install --save ui-router-ng2@1.0.0-beta.1`
- From <http://unpkg.com> via a `<script>` tag in your html: 
  - Latest stable version: `<script src="//unpkg.com/ui-router-ng2/_bundles/ui-router-ng2.js"></script>`
  - A specific version: `<script src="//unpkg.com/ui-router-ng2@1.0.0-beta.1/_bundles/ui-router-ng2.js"></script>`

## Tutorials

Learn UI-Router by following our tutorials.

- [Hello World](/ng2/tutorial/helloworld)
- [Hello Solar System](/ng2/tutorial/hellosolarsystem)
- [Hello Galaxy](/ng2/tutorial/hellogalaxy)
 
## Quick Start
 
The [UI-Router Ng2 QuickStart](https://github.com/ui-router/quickstart-ng2) is a minimalistic Angular (2+) UI-Router app forked from 
[the official Angular Quickstart](https://github.com/angular/quickstart).
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
git clone https://github.com/ui-router/ng2 ui-router-ng2
git clone https://github.com/ui-router/core ui-router-core
cd ui-router-core
npm install
npm link
npm run build

cd ../ui-router-ng2
npm install
npm link ui-router-core
npm run build
```

