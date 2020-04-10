import React from 'react'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { createMockClient } from 'mock-apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { initialState, resolvers } from '@src/client'
import { renderWithApolloClient } from '@tests/shares/utils'
import TestMock from '../../../src/views/Main/components/TestMock'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { MockedProvider } from '@apollo/react-testing'
import { mount, ReactWrapper } from 'enzyme';

describe('TestMock', () => {
	afterEach(() => {
		cleanup()
	})

	const cache = new InMemoryCache()
	cache.writeData({
		data: { ...initialState, userSearchValue: 'test_defauilt' },
	})
	const mockClient = createMockClient({
		cache,
		resolvers,
	})

	it('should match snapshot', () => {
		const dogMock = {
			request: {
				query: MESSAGE_LIST,
				variables: { query: { userId: 'testId' } },
			},
			result: {
				data: {
					messageList: {
						items: [{ id: 1, content: 'Buck', lastModified: 'poodle' }],
						hasNext: false,
						total: 1,
					},
				},
			},
		}

		mockClient.setRequestHandler(MESSAGE_LIST, () =>
			Promise.resolve({
				data: {
					messageList: {
						items: [{ id: 1, content: 'Buck', lastModified: 'poodle' }],
						hasNext: false,
						total: 1,
					},
				},
			})
		)

		const { container } = renderWithApolloClient(
			// <MockedProvider mocks={[dogMock]} addTypename={false}>
			<TestMock />,
			// </MockedProvider>,
			mockClient
		)
		expect(container).toMatchSnapshot()
	})
})
