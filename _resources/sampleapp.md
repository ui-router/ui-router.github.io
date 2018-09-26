---
title: "UI-Router Sample App"
excerpt: "A small, but non-trivial sample UI-Router application"
layout: "single"
permalink: /resources/sampleapp/
---
Explore the Sample App for:

<div class="about_frameworks">
  <div>
    <a href="https://ui-router.github.io/sample-app-angularjs"><img src="/images/logos/angular1.png"><div>AngularJS</div></a>
    <a href="https://github.com/ui-router/sample-app-angularjs">(src)</a>
  </div>
  <div>
    <a href="https://ui-router.github.io/sample-app-angular"><img src="/images/logos/angular2.png"><div>Angular (2+)</div></a>
    <a href="https://github.com/ui-router/sample-app-angular">(src)</a>
  </div>
  <div>
    <a href="https://ui-router.github.io/sample-app-angular-hybrid"><img src="/images/logos/ng1-to-ng2.png"><div>AngularJS + Angular Hybrid (ng1/ng2)</div></a>
    <a href="https://github.com/ui-router/sample-app-angular-hybrid">(src)</a>
  </div>
  <div>
    <a href="https://ui-router.github.io/sample-app-react/"><img src="/images/logos/react.png"><div>React</div></a>
    <a href="https://github.com/ui-router/sample-app-react">(src)</a>
  </div>
</div>

## UI-Router 1.0 Sample Application

The sample app is intended to demonstrate a non-trivial ui-router application.
It models the following 

- Multiple application feature modules
- Authentication (simulated)
- Authenticated and unauthenticated states
- State lifecycle management
- Application data retrieval
- REST data retrieval (simulated)

---

### Visualizer

We're using the [State and Transition Visualizer](http://github.com/ui-router/visualizer) to visually represent 
the current state tree, as well as the transitions between states.
Explore how transitions work by hovering over them, and clicking to expand details (params and resolves).  

Note how states are _entered_ when they were previously not active, _exited_ and re-_entered_ when parameters change,
and how parent states whose parameters did not change are _retained_.  
Each of these (_exited, entered, retained_) correspond to a Transition Hook.

### Structure

The application utilizes ES6 modules.

There are many ways to structure a ui-router app.
We aren't super opinionated on application structure.
Use what works for you.
We organized ours in the following way:

- Sub-module (feature) organization
  - Each feature gets its own directory. 
  - Features contain state definitions, components, and other code such as services.
- Leverage ES6 modules
  - Each thing (component, state, service) is defined in its own file (ES6 module) and is exported.
  - Each feature module has an index file which imports the code, and composes them together (as the feature module), then re-exports them.
  - At the top level, the bootstrap imports all the features and composes the application, registering services and states with UI-Router, etc.
  
### UI-Router Patterns
  
- Default substate for a top-level state
  - Example: the `mymessages` state specifies `redirectTo: 'mymessages.folder'`.
    When the user tries to activate `mymessages` (e.g., using a ui-sref link or a bookmark), the transition is redirected to `mymessages.folder`.
    
- Defining a default parameter for a state
  - Example: the `folderId` parameter of the `folder` state defaults to a value of 'inbox'.
  
- Application data lifecycle (resolve)
  - Data loading is managed by the state declaration, via the `resolve:` block
  - Data is fetched before the state is _entered_
  - Data is fetched according to state parameters
  - The state is _entered_ when the data is ready
  - The resolved data is provided to the components
  - The resolve data is accessible until the state is exited
 
- Data dirty checking and confirmation hooks
  - Example: The `contacts.edit` state allows a user to edit contact details using a form.
    If a user has modified data in the form, then tries to activate a different state,
    the edit contact component will prompt for confirmation before allowing the transition to exit `contacts.edit`.
  
- Custom application behaviors using declarative Transition Hooks.
  - The `authRequired` hook checks for state metadata, which declares that a state requires authentication.
    When a transition starts, the inspects the destination state's `data.authRequired: true` property.
    If it's truthy, then it checks that the user is authenticated, or redirects to the login state.
    
