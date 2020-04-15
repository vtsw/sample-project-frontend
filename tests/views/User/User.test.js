import React from 'react'

import { createMockClient } from 'mock-apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { act, cleanup } from '@testing-library/react'

import User from '@views/User'

import { renderWithApolloClient } from '@tests/shares/utils'
import { initialState, resolvers } from '@src/client'

describe('User', () => {
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
			const { container } = renderWithApolloClient(<User />, mockClient)
			wrapper = container
		})

		expect(wrapper).toMatchSnapshot()
	})
})
