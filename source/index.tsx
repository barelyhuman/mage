import React, {useEffect, useState} from 'react'
import {proxy, subscribe} from 'valtio'

export function createState<State extends object>(initial: State) {
	return proxy(initial)
}

export type Context<State, Actions, Injections> = {
	state: State
	actions?: Actions
	injections?: Injections
}

export type ContextWithProps<State, Actions, Injections> = Context<
	State,
	Actions,
	Injections
> & {props?: any}

export type ContextWithArbitraryRecords<State, Actions, Injections> = Context<
	State,
	Actions,
	Injections
> &
	Record<string, any>

export type ReactiveParameters<State, Actions, Injections> = {
	state: State
	actions?: Actions
	injections?: Injections
	onMount?: (ctx: ContextWithProps<State, Actions, Injections>) => void
	onDestroy?: (ctx: ContextWithProps<State, Actions, Injections>) => void
}

type HookWrapper<State, Actions, Injections> = (
	ctx: ContextWithProps<State, Actions, Injections>
) => () => any

export function makeReactive<
	State extends object,
	Actions,
	Injections extends Record<string, HookWrapper<State, Actions, Injections>>
>(
	Component: React.FC<ContextWithArbitraryRecords<State, Actions, Injections>>,
	{
		state,
		actions,
		injections,
		onMount,
		onDestroy,
	}: ReactiveParameters<State, Actions, Injections>
) {
	const mountFuncs = [onMount].filter((x) => x)
	const unmountFuncs = [onDestroy].filter((x) => x)
	const _injections: Injections = {} as Injections
	const userInjections: Injections = injections ?? ({} as Injections)

	const injectKeys: string[] = Object.keys(userInjections)

	function Wrapper({...props}) {
		const s = useState({})
		const ctx: Context<State, Actions, Injections> = {
			state,
			actions,
			injections,
		}

		for (const key of injectKeys) {
			if (key) {
				const injection = userInjections[key]
				if (
					typeof injection === 'function' &&
					typeof injection(ctx) === 'function'
				) {
					// @ts-expect-error unable to index a record of type string with key of type string, TS bug?
					// FIXME: need to debug the above
					_injections[key] = injection(ctx)()
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

				onMountCalls({
					state,
					actions,
					injections: _injections as Injections,
					props,
				})
			}

			return () => {
				unsub?.()
				for (const onDestroyCalls of unmountFuncs) {
					if (!(onDestroyCalls && typeof onDestroyCalls === 'function')) {
						continue
					}

					onDestroyCalls({
						state,
						actions,
						injections: _injections as Injections,
						props,
					})
				}
			}
		}, [])

		return (
			<Component
				state={state}
				actions={actions}
				injections={_injections as Injections}
				{...props}
			/>
		)
	}

	return Wrapper
}
