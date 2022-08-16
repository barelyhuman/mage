import React from 'react'
import {createRoot} from 'react-dom/client.js'
import {proxy} from 'valtio'
import {makeReactive} from '@barelyhuman/mage'

const state = proxy({
	count: 0,
})

function inc() {
	state.count += 1
}

function CounterImpl() {
	return (
		<>
			<p>{state.count}</p>
			<button onClick={inc}>+</button>
		</>
	)
}

const Counter = makeReactive(state)(CounterImpl)

const App = () => {
	return (
		<div>
			<Counter />
		</div>
	)
}

createRoot(document.querySelector('#app')).render(<App />)
