# Lifecycle

Component lifecycle is basically a way to control what happens when a component
is mounted and when unmounted.

Now in most cases all you need is those 2 states, and I'd like to move away from
the "side-effect of a change" mentality so that's all that this library
provides.

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

A defined method helps you locate each action easily and you can have multiple
such methods make smaller more manageable chunks, but it's **highly
recommended** to just add one `onMount` and `onDestroy` per component

You get the `props` passed to you in both cases which are what are initially
passed to the component since you might need to use the initial props to modify
the state with certain amount of data.

**But what if I wish to do something when the props changes?**

Your components are pure functions, they'll re-render on prop changes
automatically, it's never good to keep prop in sync with state, the state and
props play different roles in react, you might have to refactor how you handle
this situation.
