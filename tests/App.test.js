import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { MockedProvider } from '@apollo/react-testing'

import { App } from '../src/App'
import { RESET_CACHE } from '@views_components/NavBar/gql/mutation'
import { initialState } from '@src/client'

const mocks = [
	{
		request: {
			query: RESET_CACHE,
			variables: { data: initialState },
		},
		result: { data: initialState },
	},
]

describe('<App/>', () => {
	it('should render without crashing 1', () => {
		const history = createMemoryHistory()
		const { container, getByText } = render(
			<Router history={history}>
				<MockedProvider mocks={mocks}>
					<Route component={App} />
				</MockedProvider>
			</Router>
		)
		// console.log(getByText(/Sign in/i))
		expect(history.location.pathname).toBe('/sign-in')
		// ReactDOM.render(<App />, container)
	})
})
