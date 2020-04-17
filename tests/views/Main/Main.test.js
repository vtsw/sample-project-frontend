import React from 'react'

import { createMockClient } from 'mock-apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { act, cleanup } from '@testing-library/react'

import Main from '@views/Main'

import { renderWithApolloClient } from '@tests/shares/utils'
import { initialState, resolvers } from '@src/client'

describe('Main', () => {
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

	it('should match snapshot', async () => {
		jest.spyOn(window, 'alert').mockImplementation(() => 'Mock alert!!!')
		let wrapper
		await act(async () => {
			const { container } = renderWithApolloClient(<Main />, mockClient)
			wrapper = container
		})

		expect(wrapper).toMatchSnapshot()
	})
})
