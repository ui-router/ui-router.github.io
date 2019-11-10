---
title: "UI-Router for Angular - Hello Solar System!"
excerpt: "Learn about parameters and resolve data"
redirect_from: /tutorial/ng2/hellosolarsystem/
---
{% include toc icon="columns" title="Hello Solar System!" %}

In this tutorial, we will build on [Hello World!](helloworld) 
and explore a slightly more ambitious _Hello Solar System_ app.

This app introduces some new concepts and UI-Router features.

- [UIRouter Config](#uirouter-config)
- [Resolve data](#resolve-data)
- [State Parameters](#state-parameters)
- [Linking with params](#linking-with-params)

We have implemented a [list/detail interface](https://en.wikipedia.org/wiki/Master%E2%80%93detail_interface). 
To accomplish this, we added two new application states:

- The `people` state shows a list of all the people.
- The `person` state shows details for a specific person.

At any time, you can click the Refresh button in the Stackblitz preview.
The URL contains the information necessary to restore the application's state.
When the app restarts, UIRouter will route to the same state and load the same component and data as before.
{: .notice--info}

## Live demo

Take a look at the completed Hello Solar System live demo below.
Click "People" to view the list of all people.
Click a person's name to view that person's details.

As you navigate through the app, the [UI-Router State Visualizer](https://github.com/ui-router/visualizer) shows
the current state
{: .notice--info}

<iframe style="width: 100%; height: 450px;" src="//stackblitz.com/edit/uirouter-angular-hello-solar-system?embed=1&file=src/main.ts&view=preview" frameborder="1" allowfullscren="allowfullscren"></iframe>

<br>

## UIRouter Config

You can perform imperative router configuration or run initialization code before the router starts.
Supply a config function as `config` to `UIRouterModule.forRoot()`.

```js
import { uiRouterConfigFn } from "./config/router.config";
...
  imports: [
    ...
    UIRouterModule.forRoot({
      states: INITIAL_STATES,
      useHash: true,
      config: uiRouterConfigFn
    })
  ]
```

The function is called with two parameters: the `UIRouter` instance and the Angular `Injector`.

```js
/** UIRouter Config Function  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  // Configure the initial state
  // If the browser URL doesn't matches any state when the router starts,
  // go to the `hello` state by default
  router.urlService.rules.initial({ state: "hello" });
 
  // Use @uirouter/visualizer to show the states as a tree
  StateTree.create(router, document.getElementById("statetree"), {
    width: 200,
    height: 100
  });}
```

You can also supply a config function to `UIRouterModule.forChild()`.
You can perform configuration or initialization specific to each feature/lazy loaded module. 
{: .notice--info }


## Resolve data

When a user switches back and forth between states of a single page web 
app, the app often needs to fetch application data from a server API, 
such as a REST endpoint.

A state can specify the data it requires by defining a `resolve:` property.
When the user tries to activate a state which has a `resolve:` property,
UI-Router will fetch the required data *before activating the state*.
The fetched data is then bound to the state's component.

The `resolve:` property on a state definition is an array. 
Each element of the array is an object which defines some data to be fetched.
The object has the Dependency Injection `token` (name) for the data being loaded.
It has a `resolveFn` which returns a promise for the data.
It also has a `deps` property, used to define the DI tokens for the `resolveFn`'s dependencies (function parameters).
{: .notice--info}

The `resolve` property of the `people` state is an array containing a single object.
The object defines how to fetch the `people` data, and assigns it a DI `token` (its name).

```js
resolve: [
  {
    token: "people",
    deps: [PeopleService],
    resolveFn: (peopleService: PeopleService) => peopleService.getAllPeople()
  }
]
```

The object defines a `resolveFn` which returns a promise for all the people data.
The `resolveFn` is injected with the `PeopleService` because the first element of the `deps` property is the `PeopleService` token.
The people data is assigned a DI `token` of `'people'`.
{: .notice--info}

When fetching resolve data, we recommend delegating to services which return promises.
{: .notice--info}

UI-Router waits until the promise returned from `PeopleService.getAllPeople()` resolves before activating the `people` state.
The `People` component is created, and the list of people is fed into the component's `people:` `@Input()`.

```js
export class People { 
  @Input() people;
}
```


## State Parameters

We also want to allow the user to be able view the details for a specific person.
The `person` state takes a `personId` parameter, and uses it to fetch that specific person's details.

The parameter value is included as a part of the URL.
This enables the same person details to be shown when the browser is reloaded.

The `person` state definition:

```js
export const personState = {
  name: "person",
  url: "/people/:personId", // The personId parameter is defined as part of the URL
  component: Person,
  resolve: [
    {
      token: "person",
      deps: [Transition, PeopleService],
      resolveFn: (trans: Transition, peopleService: PeopleService) =>
        peopleService.getPerson(trans.params().personId)
    }
  ]
};
```

The URL will reflect the current `personId` parameter value, e.g., `/people/21`
{: .notice--info}

The `person` resolve delegates to PeopleService to fetch the correct person.
It passes the `personId` parameter, which it received from the `Transition` object.
The `Transition` is a special injectable object with information about the current state transition.
{: .notice--info}

### Linking with params

Note that our app's main Navigation Bar links to three states: `hello`, `about`, and `people`,
but it doesn't include a link directly to the `person` state.
This is because the state cannot be activated without a parameter value for the `personId` parameter.

In the `People` component we create one link to the `person` state for each person in the list.
We still create the link using `uiSref`, but we also include the `personId` parameter value.
As we loop over each person object using `*ngFor`, we provide the `uiSref` with the `personId` using each person's `.id` property.

{% raw %}
```js
<li *ngFor="let person of people">
  <a uiSref="person" [uiParams]="{ personId: person.id }">
    {{ person.name }}
  </a>
 </li>
```
{% endraw %}

