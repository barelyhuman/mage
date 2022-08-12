# Injections

These are basically things that can be injected to a reactive component instance.

1. State (mandatory)
2. Actions (optional)
3. Injections (optional, hook based injections)

## State

This injection is mandatory for reactive components, you don't need it to be reactive otherwise.

## Actions

These as mentioned in the [basics#actions](01-basics#actions) is optional and
can be done without it if you aren't really doing any state manipulation in which
case the component instance should be wrapped with `makeReactive` and the state
being manipulated needs to be injected into it.

## Injections

Now, this is for all the libraries that only support hooks and so while I do not recommend using these libraries at all but there's definitely libraries that are necessary and there's no other viable option so.

In that case, you can use injections which take in a key,function pair.
the function is to return another function in a hook form.

Eg:

```js
const injections = {
	// redux is only an example here, you can use the `connect` api
	somethingFromRedux: () => {
		return () => {
			const userProfile = useSelector((s) => s.user.profile)
			return userProfile
		}
	},
}

function ComponentImpl({injections}) {
	// the returned variable `userProfile` get's assigned to the
	// passed key which is `somethingFromRedux` in this case
	return <>{injections.somethingFromRedux.displayName}</>
}

const Component = makeReactive(ComponentImpl, {injections})
```
