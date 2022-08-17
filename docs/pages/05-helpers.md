# Helpers

These are injections or methods that you'll be using quite a lot during
development and this list will grow as people add more such helpers.

#### `onFocus`

Simple abstraction over the `@react-navigation/native`'s `useFocusEffect` hook,
with a slight change that it's only passed the initial props passed during
navigation to the screen.

If re-routing to the same screen with new props use the `navigation.push()`
instead of `navigation.navigate()` since it's supposed to be a new render and
not an old one. The same can be done by using `navigation.replace()`.

Eg:

```js
import { onFocus } from '@barelyhuman/mage/native'

ReactiveComponent.inject({
  onFocus: onFocus(initialProps => {
    console.log('trigger this when a react native navigation stack is in focus')
  }),
})
```
