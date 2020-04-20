import React from 'react'
import { findDOMNode } from 'react-dom'

import { act } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import waait from 'waait'

import { UserList } from '@views/Main/components'

import { mockUserList, renderDOMNode, getMarkup } from '@tests/shares/utils'
import { FETCH_USER_LIST } from '@views/User/gql/query'
import { PAGE_LIMIT } from '@src/configs.local'

const mockSearchText = 'nvdai'

const mocks = [
	{
		request: {
			query: FETCH_USER_LIST,
			variables: {
				query: { limit: PAGE_LIMIT },
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
				query: { limit: PAGE_LIMIT },
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
		userSearchValueOfMain: () => {
			return ''
		},
		selectedUserOfMain: () => {
			return mockUserList[0]
		},
	},
	Mutation: {
		setUserSearchValueOfMain: (_, { searchValue }, { cache }) => {
			cache.writeData({
				data: {
					userSearchValueOfMain: searchValue,
				},
			})
			return searchValue
		},
	},
}

describe('UserList', async () => {
	let rendered

	beforeEach(() => {
		rendered = findDOMNode(
			renderDOMNode(
				getMarkup(
					<MockedProvider
						mocks={mocks}
						addTypename={false}
						resolvers={resolvers}
					>
						<UserList />
					</MockedProvider>
				)
			)
		)
	})

	it('should match snapshot', async () => {
		await act(async () => {
			await waait(10)
		})

		expect(rendered).toMatchSnapshot()
	})

	it('should fetch successfully new user list with a new search text value', async () => {
		const input = rendered.querySelectorAll('[placeholder="search..."]')[0]
		const searchButton = rendered.querySelectorAll(
			'[data-testid=actioninputbox-button]'
		)[0]

		expect(input.value).toBe('')
		input.value = mockSearchText
		expect(input.value).toBe(mockSearchText)

		await act(async () => {
			await searchButton.click()
		})

		expect(rendered.textContent).toContain(mockSearchText)
	})
})
