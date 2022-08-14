# Injections

This is a "**good to have**" for libraries that only provide hooks and so you don't have to trash your entire
component but be able to slowly add `mage` as a disciplinary library while writing components
and so while we do not recommend using these libraries, sometimes there's no other viable option.

In which case, it's easier to just use the hooks they provide to inject them (pass them) to the
reactive component and the reactive component only.

The state and injections are kept separate to make sure you can reuse your state connector later.

Eg:

```js
const injections = {
	// redux is only an example here, you should be able to the `connect` api
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

const Component = makeReactive({})(ComponentImpl)

Component.inject(injections)
```
