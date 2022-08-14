# @barelyhuman/mage

> stateful + logical abstraction layer for react

<a class="badge" href="https://bundlephobia.com/package/@barelyhuman/mage"><img src="https://img.shields.io/bundlephobia/minzip/@barelyhuman/mage?label=bundle%20size&amp;style=flat&amp;colorA=000000&amp;colorB=000000" alt=""></a>

## Highlights

- Tiny
- 0 Deps

## Usage

> **Note**: The library depends on `valtio`, so please install valtio as well
> (ignore if already installed)

```sh
npm install @barelyhuman/mage valtio
# or
yarn add @barelyhuman/mage valtio
# or
pnpm add @barelyhuman/mage valtio
```

### Quick Copy

```js
import {createState, makeReactive} from '@barelyhuman/mage'

const state = createState({
	count: 0,
})

function inc() {
	state.count += 1
}

function CounterImpl() {
	return (
		<>
			<p>{state.count}</p>
			<button onClick={inc}>+</button>
		</>
	)
}

const Component = makeReactive(state)(CounterImpl)

export default Component
```

## About

> **Note**: This library isn't a mandatory requirement, most of what it does can
> be done by using something like [valtio](https://valtio.pmnd.rs) or
> [jotai](http://jotai.org) and maintaining local state in the component file
> and not inside the component and side effects being thrown out of your head
> and using manual action based triggers inside other actions. (how you'd write
> normal javascript)

The reason for mage to exist was to abstract and block the usage of hooks in
functional components. This became necessary after libraries dropping support
for class based components and specifically writing stuff for hooks (I'm also
someone who's done this). So, this library is just to help you avoid writing
hooks by giving a better way to write just javascript in react

Hooks, inherently aren't bad but the usage abuse of everything having to be a
hook and libraries polluting this space ends up creating code where a functional
component has more hooks than it has rendering logic.

This also ends up with mix and match between hooks that aren't composable.

For example, custom hooks that use redux and then manipulated hooks that use
that redux state can cause a lot of re-renders, which can be avoided by using
`refs` and a bit of diffing logic but that's not supposed to be that
complicated.

This is where it's necessary for that abstraction to be taken up by a utility.

## Docs

You can read more about the usage and API by checking the
[docs/pages](docs/pages) folder in the repo or by visiting the
[web version &rarr;](https://barelyhuman.github.io/mage/)

## Disclaimer

I have nothing against react, I like the library, I'm just not satisfied by the
direction of how things are done when using it, so this is a disciplinary
abstraction that forces you to write functional components as just that. A
function that returns a component based on props.

## License

[MIT](license)
