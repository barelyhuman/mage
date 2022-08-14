# Basics

Most of what is to be done is self explanatory from the
[Quick Copy](/#quick-copy) example but let's get into explaining what can and
cannot be done

## State

Unlike react, a state in mage is any variable that can be edited and or modified
and is supposed to re-render post that modification. Similar to react, every
state change will cause a re-render so are to be done when necessary.

> **Note**: mage uses [valtio](https://valtio.pmnd.rs) internally to handle
> state so the same rules as valtio apply to the state.

Here's how you create and handle state

```js
import {createState} from '@barelyhuman/mage'

// initialise state
const state = createState({
	someStatefulVariableName: 'initial state',
})

// make some change
state.someStatefulVariableName = 'hello world'
```

Unless connected to a component, the above will make no difference and is just
going to assign itself the new value, in this case `hello world`

## Components

When using mage, a component is just a view that's being returned from a
function and so you need to change your thinking about how you use stateful
components.

```js
function Component({aProp}) {
	return <p>My view is dictated by {aProp}</p>
}
```

## Reactive Components

The library tries to make it a habit for developers to write disposable and reusable
components that aren't bound to 100's of stuff just because of how react works right now.

We do this by separating the 2 base requirements of a UI component

1. State
2. Functional Logic / Business Logic

When working with mage, you define state away from the actual component
and connect it to the component using the `makeReactive` utility.

State can be defined by using `createState` as shown below.

```js
import {createState, makeReactive} from '@barelyhuman/mage'

const state = createState({
	name: 'Reaper',
})

function Component() {
	return <p>{state.name}? Who's that?</p>
}

const ReactiveComponent = makeReactive(state)(Component)
```

### Actions

Next up, is the business logic.

We recommend using Class components when writing
such components where there's a ton of business logic but since we've abstracted the state
away from the component, business logic can be just simple functions that are passed values from
inside the component.

> **Note**: pass the needed values to the functions from inside the component as parameters where
> necessary, use state only for values that should cause a re-render and **not** for everything you
> wish for both the function and component to share

**Example**

```js
import {createState, makeReactive} from '@barelyhuman/mage'

const state = createState({
	greeting: 'hello',
})

function changeGreeting(e) {
	state.greeting = e.target.value
}

function ComponentImpl() {
	return (
		<>
			<input value={state.greeting} onChange={changeGreeting} />
		</>
	)
}

const Component = makeReactive(state)(ComponentImpl)
```
