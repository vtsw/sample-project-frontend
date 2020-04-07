import React from 'react'

import { createMockClient } from 'mock-apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'

import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

import { App } from '../src/App'

import { initialState, resolvers } from '@src/client'

describe('<App/>', () => {
	const cache = new InMemoryCache()
	cache.writeData({
		data: { ...initialState, messageCreateValueOfMessage: '' },
	})
	const mockClient = createMockClient({ cache, resolvers })
	it('should match snapshot', () => {
		const history = createMemoryHistory()
		const { container } = render(
			<Router history={history}>
				<ApolloProvider client={mockClient}>
					<Route component={App} />
				</ApolloProvider>
			</Router>
		)
		expect(container.firstChild).toMatchSnapshot()
	})
})
