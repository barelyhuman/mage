import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
export { createState } from '@barelyhuman/mage'

export function onFocus(cb) {
  return () => () => {
    useFocusEffect(
      useCallback(() => {
        cb()
      }, [])
    )
  }
}
