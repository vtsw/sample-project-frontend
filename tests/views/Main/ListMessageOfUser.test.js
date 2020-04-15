import React from 'react'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { createMockClient } from 'mock-apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { initialState, resolvers } from '@src/client'
import { renderWithApolloClient } from '@tests/shares/utils'
import { ListMessageOfUser } from '@views/Main/components'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { MockedProvider } from '@apollo/react-testing'

describe('ListMessageOfUser', () => {
	const mockProps = {
		selectedUser: { id: 'testId', name: 'testName', email: 'test@gmail.com' },
	}

	afterEach(() => {
		cleanup()
	})

	const cache = new InMemoryCache()
	cache.writeData({
		data: { ...initialState },
	})
	const mockClient = createMockClient({ cache, resolvers })

	it('should match snapshot', () => {
		const dogMock = {
			request: {
				query: MESSAGE_LIST,
				variables: { query: { userId: 'testId', limit: 30 } },
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

		const { container } = render(
			<MockedProvider mocks={[dogMock]} addTypename={false}>
				<ListMessageOfUser {...mockProps} />
			</MockedProvider>
		)
		expect(container).toMatchSnapshot()
	})
})
