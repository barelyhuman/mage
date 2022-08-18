import { createSubscribeHOC } from '@barelyhuman/mage/_internal'
import { useEffect, useLayoutEffect, useState } from 'preact/hooks'
import { h, FunctionComponent } from 'preact'

import { subscribe } from 'valtio/vanilla'

export { createState } from '@barelyhuman/mage/_internal'

// decide if inside an SSR environment or not
const useEffectFunc =
  typeof window === 'undefined' || 'Deno' in window
    ? useEffect
    : useLayoutEffect

export function makeReactive<S extends Record<string, unknown>>(state: S) {
  return function <Props>(
    Component: FunctionComponent<
      Props & { state?: S; injections?: Record<string, unknown> }
    >
  ) {
    return createSubscribeHOC(
      state,
      Component,
      subscribe,
      useEffectFunc,
      useState,
      h
    )
  }
}
