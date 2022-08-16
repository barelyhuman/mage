import React, { useState } from 'react'

type HookFunc<Props> = (props: Props) => void

type WrappedReactHook<Props> = (props: Props) => () => any

type subscribeFunc = <T extends object>(
  stateObject: T,
  callback: (ops: any) => void
) => () => void

export function createSubscribeHOC<Props, State extends object>(
  state: State,
  Component: React.FC<Props>,
  subscribeFunc: subscribeFunc,
  useEffectFunc
) {
  const mountFuncs: Array<HookFunc<Props>> = []
  const unMountFuncs: Array<HookFunc<Props>> = []
  let _injections: Record<string, WrappedReactHook<Props>> = {}
  const injectedData: Record<string, unknown> = {}

  function Wrapper({ ...props }: Props) {
    const s = useState({})

    for (const key in _injections) {
      const hookWrapper = _injections[key]
      if (!(hookWrapper && typeof hookWrapper === 'function')) continue

      injectedData[key] = hookWrapper(props)()
    }

    useEffectFunc(() => {
      const unsub = subscribeFunc(state, () => {
        s[1]({})
      })

      for (const x of mountFuncs) x({ ...props, injections: _injections })

      return () => {
        for (const x of unMountFuncs) x({ ...props, injections: _injections })

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
