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
function and so you need to change your thinking about how you used stateful
components.

```js
function Component({aProp}) {
	return <p>My view is dictated by {aProp}</p>
}
```

## Reactive Components

Now, the whole point of the library is to keep components simple to discard and
make changes to, so to make the above reactive or show something based on state
instead of props, define the state in the same file using `createState`.

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

Now, all you're doing is using a function and a variable to create a reactive
component that'll re-render based on changes to the state.

### Actions

Just state is not what goes into a component, the business logic is also
something that's needed, now I recommend using Class components when writing
such components where there's a ton of business logic but, mage can do that for
you as well.

The only requirement is for the state to be injected into the component for it to be monitored
, everything else should be just functions, so the below is how
you'll be defining most of the behaviour

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
