import React, {useEffect, useState} from 'react'
import {proxy, subscribe} from 'valtio'

export function createState(initial: Record<string, unknown>) {
	return proxy(initial)
}

export type Context = {
	state?: Record<string, unknown>
	actions?: Record<string, unknown>
	injections?: Record<string, unknown>
}

export type ReactiveParameters = {
	state?: Record<string, unknown>
	actions?: Record<string, unknown>
	injections?: Record<string, unknown>
	onMount?: (ctx: Context) => void
	onDestroy?: (ctx: Context) => void
}

export function makeReactive(
	Component: any,
	{state, actions, injections, onMount, onDestroy}: ReactiveParameters
) {
	const mountFuncs = [onMount].filter((x) => x)
	const unmountFuncs = [onDestroy].filter((x) => x)
	const _injections: any = {}
	const userInjections: any = injections ?? {}

	const injectKeys: string[] = Object.keys(userInjections)

	function Wrapper({...props}) {
		const s = useState({})

		for (const key of injectKeys) {
			if (key) {
				const injection = userInjections[key]
				if (
					typeof injection === 'function' &&
					typeof injection() === 'function'
				) {
					_injections[key] = injection()()
				}
			}
		}

		useEffect(() => {
			let unsub: () => void
			if (state) {
				unsub = subscribe(state, () => {
					s[1]({})
				})
			}

			for (const onMountCalls of mountFuncs) {
				if (!(onMountCalls && typeof onMountCalls === 'function')) {
					continue
				}

				onMountCalls({state, actions, injections: _injections})
			}

			return () => {
				unsub?.()
				for (const onDestroyCalls of unmountFuncs) {
					if (!(onDestroyCalls && typeof onDestroyCalls === 'function')) {
						continue
					}

					onDestroyCalls({state, actions, injections: _injections})
				}
			}
		}, [])

		return (
			<Component
				state={state}
				actions={actions}
				injections={_injections}
				{...props}
			/>
		)
	}

	return Wrapper
}
