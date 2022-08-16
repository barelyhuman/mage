import React, {useEffect, useState} from 'react'
import {proxy, subscribe} from 'valtio'

type HookFunc<Props> = (props: Props) => void

type WrappedReactHook<Props> = (props: Props) => () => any

export function createState<S extends Record<string, unknown>>(intitial: S) {
	return proxy(intitial)
}

export function makeReactive<S extends Record<string, unknown>>(state: S) {
	return function <Props>(
		Component: React.FC<Props & {state: S; injections: Record<string, unknown>}>
	) {
		const mountFuncs: Array<HookFunc<Props>> = []
		const unMountFuncs: Array<HookFunc<Props>> = []
		let _injections: Record<string, WrappedReactHook<Props>> = {}
		const injectedData: Record<string, unknown> = {}

		function Wrapper({...props}: Props) {
			const s = useState({})

			for (const key in _injections) {
				const hookWrapper = _injections[key]
				if (!(hookWrapper && typeof hookWrapper === 'function'))
					continue


				injectedData[key] = hookWrapper(props)()
			}

			useEffect(() => {
				const unsub = subscribe(state, () => {
					s[1]({})
				})

				for (const x of mountFuncs)
					x({...props, injections: _injections})


				return () => {
					for (const x of unMountFuncs)
						x({...props, injections: _injections})


					unsub()
				}
			}, [])
			return <Component state={state} injections={injectedData} {...props} />
		}

		Wrapper.onMount = (fn: HookFunc<Props>) => {
			mountFuncs.push(fn)
		}

		Wrapper.onDestroy = (fn: HookFunc<Props>) => {
			unMountFuncs.push(fn)
		}

		Wrapper.inject = (injections: Record<string, WrappedReactHook<Props>>) => {
			_injections = injections
		}

		return Wrapper
	}
}
