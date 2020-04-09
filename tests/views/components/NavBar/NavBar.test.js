import React from 'react'
import { cleanup } from '@testing-library/react'

import { createMockClient } from 'mock-apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'

import { NavBar } from '@views_components'

import { renderWithRouter } from '@tests/shares/utils'
import { initialState, resolvers } from '@src/client'

describe('NavBar', () => {
	const cache = new InMemoryCache()
	cache.writeData({
		data: initialState,
	})
	const mockClient = createMockClient({
		cache,
		resolvers,
	})

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = renderWithRouter(
			<ApolloProvider client={mockClient}>
				<NavBar />
			</ApolloProvider>
		)

		expect(container).toMatchSnapshot()
	})
})
