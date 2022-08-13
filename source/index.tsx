import React, {useEffect, useState} from 'react'
import {subscribe} from 'valtio'

type HookFunc<Props> = (props: Props) => void

type WrappedReactHook<Props> = (props: Props) => () => any

export function createReactive<S extends object>(state: S) {
	return function createWrapper<Props>(
		Component: React.FC<Props & {state: S; injections: Record<string, unknown>}>
	) {
		let mountFuncs: HookFunc<Props>[] = []
		let unMountFuncs: HookFunc<Props>[] = []
		let _injections: Record<string, WrappedReactHook<Props>> = {}
		let injectedData: Record<string, unknown> = {}

		function Wrapper({...props}: Props) {
			const s = useState({})

			for (const key in _injections) {
				const hookWrapper = _injections[key]
				if (!(hookWrapper && typeof hookWrapper === 'function')) {
					continue
				}
				injectedData[key] = hookWrapper(props)()
			}

			useEffect(() => {
				mountFuncs.forEach((x) => {
					x(props)
				})

				const unsub = subscribe(state, () => {
					s[1]({})
				})
				return () => {
					unMountFuncs.forEach((x) => {
						x(props)
					})
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

		Wrapper.injections = (
			injections: Record<string, WrappedReactHook<Props>>
		) => {
			_injections = injections
		}

		return Wrapper
	}
}
