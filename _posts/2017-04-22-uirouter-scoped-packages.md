---
layout: post
excerpt: Scoped NPM packages
comments: true
permalink: /blog/:title/
---


### Scoped NPM packages

In March of 2017, NPM started [offering free orgs](https://twitter.com/rockbot/status/844679739956592641) (Thanks, [npm loves you](https://twitter.com/npm_support), we love you too!)

We're taking advantage of the free org feature to publish [scoped packages](https://docs.npmjs.com/misc/scope).
We [created the `@uirouter` org](https://www.npmjs.com/org/uirouter/) and are in the process of moving all our published packages to scoped pakages.


### How to use scoped packages

In your package.json, simply replace the old npm package with the scoped `@uirouter` package.
For example, if you currently depend on `angular-ui-router` and `ui-router-visualizer`:

```js
  "dependencies": {
    "angular-ui-router": "latest",
    "ui-router-visualizer": "latest",
  }
```

replace the package name with the scoped `@uirouter` package:

```js
  "dependencies": {
    "@uirouter/angularjs": "latest",
    "@uirouter/visualizer": "latest",
  }
```

### Old and new (scoped) package names

This table shows the previous npm package names, and the new scoped package names

|Package|Old package|Scoped package|
|-------|-----------|--------------|
|[UI-Router for AngularJS (1.x)](https://github.com/angular-ui/ui-router/)|`angular-ui-router`|`@uirouter/angularjs`|
|[UI-Router for Angular (2.x and higher)](https://github.com/ui-router/angular)|`ui-router-ng2`|`@uirouter/angular`|
|[UI-Router for React](https://github.com/ui-router/react)|`ui-router-react`|`@uirouter/react`|
|[UI-Router Visualizer](https://github.com/ui-router/visualizer)|`ui-router-visualizer`|`@uirouter/visualizer`|
|[UI-Router Core](https://github.com/ui-router/core)|`ui-router-core`|`@uirouter/core`|
|[UI-Router Reactive Extensions](https://github.com/ui-router/rx)|`ui-router-rx`|`@uirouter/rx`|
|[UI-Router ng1-to-ng2 (hybrid support)](https://github.com/ui-router/ng1-to-ng2)|`ui-router-ng1-to-ng2`|`@uirouter/angular-hybrid`|
|[Sticky States plugin](https://github.com/ui-router/sticky-states)|`ui-router-sticky-states`|`@uirouter/sticky-states`|
