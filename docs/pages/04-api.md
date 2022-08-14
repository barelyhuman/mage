# API Reference

#### createState

Takes in an object for the initial state and returns the same state as mutable state of the same structure

```ts
function createState<S extends object>(intitial: S): S
```

#### makeReactive

A curried function (or a function that returns another function) that takes in the state and the component that is supposed to listen to the state's changes.

```ts
function makeReactive<S extends object>(
	state: S
): <Props>(
	Component: React.FC<
		Props & {
			state: S
			injections: Record<string, unknown>
		}
	>
) => {
	({...props}: Props): JSX.Element
	onMount(fn: HookFunc<Props>): void
	onDestroy(fn: HookFunc<Props>): void
	inject(injections: Record<string, WrappedReactHook<Props>>): void
}
```

**Examples**

```ts
const greetingState = createState({greeting: 'hello'})

const connectGreetingState = makeReactive(greetingState)

function Component() {
	return <> {greetingState.greeting} ,world</>
}

const ReactiveComponent = connectGreetingState(Component)

ReactiveComponent.onMount(() => {
	// will execute post mount
})

ReactiveComponent.onDestroy(() => {
	// will execute pre destroy
})

ReactiveComponent.inject({
	// .. inject data or handlers from other hooks
})
```
