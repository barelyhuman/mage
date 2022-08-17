import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
export { createState } from '@barelyhuman/mage'

export function onFocus<Props, C extends (props: Props) => void>(cb: C) {
  return (initialProps: Props) => () => {
    useFocusEffect(
      useCallback(() => {
        cb(initialProps)
      }, [])
    )
  }
}
