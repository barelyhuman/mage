import { createSubscribeHOC } from '@barelyhuman/mage/_internal'
import React, { useEffect } from 'react'
import { proxy, subscribe } from 'valtio'

export function createState<S extends Record<string, unknown>>(intitial: S) {
  return proxy(intitial)
}

export function makeReactive<S extends Record<string, unknown>>(state: S) {
  return function <Props>(
    Component: React.FC<
      Props & { state?: S; injections?: Record<string, unknown> }
    >
  ) {
    return createSubscribeHOC(state, Component, subscribe, useEffect)
  }
}
