import { createState, makeReactive } from '@barelyhuman/mage'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import test from 'ava'
// @ts-ignore
import browserEnv from 'browser-env'
import React from 'react'

browserEnv()

test.afterEach(() => {
  cleanup()
})

test.serial('should display a stateless component', async t => {
  function Component() {
    return <p id="test">hello</p>
  }

  const ReactiveComponent = makeReactive(createState({}))(Component)

  const { getByText } = render(<ReactiveComponent />)
  getByText('hello')
  t.pass()
})

test.serial('should add 1 additional render on state change', async t => {
  const state = createState({ count: 0 })
  let renders = 0

  function inc() {
    state.count += 1
  }

  function Component() {
    renders += 1
    return (
      <>
        <p>{state.count}</p>
        <button onClick={inc}>inc</button>
      </>
    )
  }

  const ReactiveComponent = makeReactive(state)(Component)

  const { getByText } = render(<ReactiveComponent />)

  const initialRender = renders

  fireEvent.click(getByText('inc'))
  await waitFor(() => getByText('1'))
  if (renders - initialRender > 1) {
    t.fail()
    return
  }

  t.pass()
})

test.serial('should take state from the onMount value', async t => {
  const state = createState({ count: 0 })
  const onMountValue = 10
  function Component() {
    return (
      <>
        <p>{state.count}</p>
      </>
    )
  }

  const ReactiveComponent = makeReactive(state)(Component)
  ReactiveComponent.onMount(_ => {
    state.count = onMountValue
  })
  const { getByText } = render(<ReactiveComponent />)
  // Need to wait for a mount and then re-render before it changes to the
  // given mounted value
  const elm = await waitFor(() => getByText(onMountValue))
  t.assert(String(onMountValue), elm.innerText)
})
