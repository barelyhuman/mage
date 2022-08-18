import { proxy } from 'valtio'

export function createState<S extends Record<string, unknown>>(intitial: S) {
  return proxy(intitial)
}
