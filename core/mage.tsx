import { createSubscribeHOC } from '@barelyhuman/mage/_internal'
import React, { useEffect, useLayoutEffect } from 'react'
import { proxy, subscribe } from 'valtio'

export function createState<S extends Record<string, unknown>>(intitial: S) {
  return proxy(intitial)
}

// decide if inside an SSR environment or not
const useEffectFunc =
  typeof window === 'undefined' || 'Deno' in window
    ? useEffect
    : useLayoutEffect

export function makeReactive<S extends Record<string, unknown>>(state: S) {
  return function <Props>(
    Component: React.FC<
      Props & { state?: S; injections?: Record<string, unknown> }
    >
  ) {
    return createSubscribeHOC(state, Component, subscribe, useEffectFunc)
  }
}
