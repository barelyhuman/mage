# Lifecycle

Lifecycle control is another part which cannot be avoided with a SPA (Single Page App), since
a lot of data fetching and initial logic comes into play here.

Once you start using mage, there needs to be a slight mentality shift since there's no more
side-effect based changes , and the only lifecycle phases you have control over is the mount and
unmount of a component.

```js
import {makeReactive} from '@barelyhuman/mage'

const Component = makeReactive(state)(() => <></>)

Component.onMount((props) => {
	console.log("I've mounted")
})

Component.onDestroy((props) => {
	console.log('hello darkness, my old friend!')
})
```

A defined method (eg: `onMount`) helps you locate each action easily and you can have multiple
such methods to make smaller more manageable chunks, but it's **highly
recommended** to just add one `onMount` and `onDestroy` per component

You get the `props` passed to you in both cases which are what are initially
passed to the component since you might need to use the initial props to modify
the state with certain amount of data.

**What if I wish to do something when the props changes?**

Your components are pure functions, they'll re-render on prop changes
automatically, it's never good to keep prop in sync with state, the state and
props play different roles in react, you should refactor how you write your component
in this case

**What if a state changes and I wish that to trigger an effect?**
You trigger the function after the state change and pass it the changed state.
This keeps the effects in a single place and easier to modify and look for later than
running through 10 different `useEffect` each handling it's own set of dependencies
which cause 10 different render actions and makes it easier to make mistakes.

**example**
If I wish to create an `alert` everytime I change count, here's how I'd write it.

```js
const counterState = createState({count: 0})

const withCounterState = makeReactive(counterState)

function inc() {
	counterState.count += 1
	showAlert(counterState.count)
}

function showAlert(count) {
	alert('count increased', count)
}

function Component() {
	return (
		<>
			<p>{counterState.count}</p>
			<button onClick={inc}>Inc</button>
		</>
	)
}

const ReactiveComponent = withCounterState(Component)
```

For functional programming lovers, you now have a way to keep the following separate without creating a lot of noise inside the component.

- pure functional components - render what's given and have functional triggers to change the view
- pure functions - same result on same parameters (`showAlert` in the above example)
- sideeffect functions - functions that change the state , and mostly what's the components use to trigger changes to state
