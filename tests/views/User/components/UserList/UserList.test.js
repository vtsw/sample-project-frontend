import React from 'react'

import { MockedProvider } from '@apollo/react-testing'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import wait from 'waait'

import { UserList } from '@views/User/components'

import { mockUserList } from '@tests/shares/utils'
import { FETCH_USER_LIST } from '@views/User/gql/query'

const mockSearchText = 'nvdai'

const mocks = [
	{
		request: {
			query: FETCH_USER_LIST,
			variables: {
				query: { searchText: '', limit: 30 },
			},
		},
		result: {
			data: {
				userList: {
					items: mockUserList,
					hasNext: true,
				},
			},
		},
	},
	{
		request: {
			query: FETCH_USER_LIST,
			variables: {
				query: { searchText: mockSearchText, limit: 30 },
			},
		},
		result: {
			data: {
				userList: {
					items: mockUserList,
					hasNext: true,
				},
			},
		},
	},
]

const resolvers = {
	Query: {
		userSearchValue: () => {
			return ''
		},
		selectedUser: () => {
			return {
				id: '123',
				name: 'dai',
				email: 'nvdai123@gmail.com',
			}
		},
	},
	Mutation: {
		setUserSearchValue: (_, { searchValue }, { cache }) => {
			cache.writeData({
				data: {
					userSearchValue: searchValue,
				},
			})
			return searchValue
		},
	},
}

describe('UserList', async () => {
	let component

	beforeEach(async () => {
		await act(async () => {
			component = render(
				<MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
					<UserList />
				</MockedProvider>
			)
		})
	})
	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', async () => {
		await act(async () => {
			await wait(10)
		})

		expect(component.container).toMatchSnapshot()
	})

	it('should render all elements without crashing', () => {
		const { getByTestId, getByPlaceholderText, getByText } = component

		expect(getByText('User List')).toBeTruthy()
		expect(getByPlaceholderText('search...')).toBeTruthy()
		expect(getByTestId('search-icon')).toBeTruthy()
		expect(getByTestId('infinitetable')).toBeTruthy()
	})

	it('should fetch successfully new user list with a new search text value', async () => {
		const { getByTestId, getByPlaceholderText } = component

		const input = getByPlaceholderText('search...')

		expect(input.value).toBe('')

		fireEvent.change(input, { target: { value: mockSearchText } })

		expect(input.value).toBe(mockSearchText)

		await act(async () => {
			await fireEvent.click(getByTestId('search-icon'))
		})

		expect(getByTestId('infinitetable')).toBeTruthy()
	})
})
