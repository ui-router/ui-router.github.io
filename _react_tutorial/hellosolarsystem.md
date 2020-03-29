---
title: "UI-Router for React - Hello Solar System!"
excerpt: "Learn about parameters and resolve data"
layout: single
sitemap: true
redirect_from: /tutorial/react/hellosolarsystem/
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

<iframe style="width: 100%; height: 450px;" src="//stackblitz.com/edit/uirouter-react-hello-solar-system?embed=1&file=src/index.js&view=preview" frameborder="1" allowfullscren="allowfullscren"></iframe>

<br>

## UIRouter Config

You can perform imperative router configuration or run initialization code before the router starts.
Supply a `config` prop to the `UIRouter` component.

```js 
<UIRouter config={config}><App/></UIRouter>
```

The function is called and passed the `UIRouter` instance.

```js
import { visualizer } from '@uirouter/visualizer';
 
// the config function takes the router
// instance as argument. it lets you manually
// configure the router
export default function config(router) {
  // Specify the initial route when the initial URL matched no state
  router.urlService.rules.initial({ state: "hello" });
  // Setup the state visualizer
  visualizer(router);
};
````

## Resolve data

When a user switches back and forth between states of a single page web
app, the app often needs to fetch application data from a server API,
such as a REST endpoint.

A state can specify the data it requires by defining a `resolve:` property.
When the user tries to activate a state which has a `resolve:` property,
UI-Router will fetch the required data *before activating the state*.
The fetched data is then passed via props to the component(s).

The `resolve:` property on a state definition is an array.
Each element of the array is an object which defines some data to be fetched.
The object has the Dependency Injection `token` (name) for the data being loaded.
It has a `resolveFn` which returns a promise for the data.
It also has a `deps` property, used to define the DI tokens for the `resolveFn`'s dependencies (function parameters).
{: .notice--info}

The `resolve` property of the `people` state is an array containing a single object.
The object defines how to fetch the `people` data, and assigns it a DI `token` (its name).

```js
resolve: [{
  token: 'people',
  resolveFn: () => PeopleService.getAllPeople()
}]
```

The object defines a `resolveFn` which returns a promise for all the people data.
The data is assigned a DI `token` of `'people'`.
{: .notice--info}

When fetching data, we recommend delegating to services which return promises.
{: .notice--info}

UI-Router waits until the promise returned from `PeopleService.getAllPeople()` resolves before activating the `people` state.
The `People` component is created, and the list of people is passed to the component via its `props`.

```js
People.propTypes = {
  resolves: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.object)
  })
}
```


## State Parameters

We also want to allow the user to be able to view the details for a specific person.
The `person` state takes a `personId` parameter, and uses it to fetch that specific person's details.

The parameter value is included as a part of the URL.
This enables the same person details to be shown when the browser is reloaded.

The `person` state definition:

```js
const person = {
  name: 'person',
  url: '/people/:personId',
  component: Person,
  resolve: [{
    token: 'person',
    deps: ['$transition$'],
    resolveFn: (trans) => PeopleService.getPerson(trans.params().personId)
  }]
}
```

The URL will reflect the current `personId` parameter value, e.g., `/people/21`
{: .notice--info}

The `person` resolve delegates to PeopleService to fetch the correct person.
The resolveFn is injected with the `Transition` object because the first element of the `deps` property is the `$transition$` token.
This way it can access the `personId` parameter.
The `Transition` is a special injectable object with information about the current state transition.
{: .notice--info}

### Linking with params

Note that our app's main Navigation Bar links to three states: `hello`, `about`, and `people`,
but it doesn't include a link directly to the `person` state.
This is because the state cannot be activated without a parameter value for the `personId` parameter.

In the `people` state we separate create links to the `person` state for each person.
Like before, we create the link using the `useSrefActive` hook, but we supply state parameters as the second argument.
The object passed contain the `personId` parameter value.

The `useSrefActive` hook is run inside a separate component to avoid the hooks order changing, if people were added or removed.
{: .notice--info}

We render a `PersonLink` for each person we loop over.
The `PersonLink` component passes an object containing the `personId` parameter as the second argument to `useSrefActive`.

{% raw %}
```js
const PersonLink = ({ person }) => {
  const personSref = useSrefActive("person", { personId: person.id }, "active");
  return (
    <li>
      <a {...personSref}>{person.name}</a>
    </li>
  );
};

...
  {people.map(person => (
    <PersonLink key={person.id} person={person} />
  ))}
...
```
{% endraw %}

