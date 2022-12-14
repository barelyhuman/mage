import {makeReactive} from '@barelyhuman/mage'
import React, {useState} from 'react'
import {createRoot} from 'react-dom/client.js'
import {proxy} from 'valtio'

const state = proxy({
	count: 0,
})

function inc() {
	state.count += 1
}

function CounterImpl({injections}) {
	return (
		<>
			<p>{state.count}</p>
			<button onClick={inc}>+</button>

			<section>
				<h4>Injected Data</h4>
				<p>{`injections.name: ${injections.name}`}</p>
			</section>
		</>
	)
}

const Counter = makeReactive(state)(CounterImpl)

Counter.onMount((props) => {
	state.count = props.initial
})

Counter.inject({
	name: () => () => {
		const [name] = useState('Reaper')
		return name
	},
})

const App = () => {
	return (
		<div>
			<Counter initial={2} />
		</div>
	)
}

createRoot(document.querySelector('#app')).render(<App />)
