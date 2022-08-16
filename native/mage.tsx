import { createSubscribeHOC } from '@barelyhuman/mage/_internal'
import { useFocusEffect as useRNFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { subscribe } from 'valtio'
export { createState } from '@barelyhuman/mage'

function useFocusEffect(cb, deps) {
  useRNFocusEffect(useCallback(cb, deps))
}

export function makeReactive<S extends Record<string, unknown>>(state: S) {
  return function <Props>(
    Component: React.FC<
      Props & { state?: S; injections?: Record<string, unknown> }
    >
  ) {
    return createSubscribeHOC(state, Component, subscribe, useFocusEffect)
  }
}
