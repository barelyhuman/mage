import { proxy } from 'valtio/vanilla'

export function createState<S extends Record<string, unknown>>(intitial: S) {
  return proxy(intitial)
}
