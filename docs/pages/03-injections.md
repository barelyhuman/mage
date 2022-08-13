# Injections

Now, this is a "**good to have**" for all the libraries that only support hooks
and so while I do not recommend using these libraries at all but there's
definitely libraries that are necessary and that leaves us with no viable
options so, in that case, you can use injections which take in a key,function
pair. the function is to return another function in a hook form, similar to how you'd be declaring
a custom hook

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
