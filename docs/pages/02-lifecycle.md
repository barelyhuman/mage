# Lifecycle

Component lifecycle is basically a way to control what happens
when a component is mounted and when unmounted, so the reactive
components will in most cases, need a way to define behaviour when
a component mounts and when it unmounts.

Now in most cases all you need is mount and unmount and I'd like to move away from the side-effect of a change mentality so that's all that this library provides.

```js
import {makeReactive} from '@barelyhuman/mage'

makeReactive(() => <></>, {
	state,
	actions,
	injections,
	onMount({state, actions, injections, props}) {
		console.log("I've mounted")
	},
	onDestroy({state, actions, injections, props}) {
		console.log('hello darkness, my old friend!')
	},
})
```

You get the `state, actions, injections, props` passed to you in both cases
since you might need to use the initial props while doing something.

**But what if I wish to do something when the props changes?**
Valid point, a `onPropChange` is in the works
