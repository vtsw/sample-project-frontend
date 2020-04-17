import React from 'react'
import { findDOMNode } from 'react-dom'

import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import { act } from '@testing-library/react'

import User from '@views/User'

import { mockUserList, renderDOMNode, getMarkup } from '@tests/shares/utils'
import { FETCH_USER_LIST } from '@views/User/gql/query'

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

describe('User', () => {
	it('should match snapshot', async () => {
		let rendered
		await act(async () => {
			rendered = findDOMNode(
				renderDOMNode(
					getMarkup(
						<MockedProvider
							mocks={mocks}
							addTypename={false}
							resolvers={resolvers}
						>
							<User />
						</MockedProvider>
					)
				)
			)
		})
		await wait(10)
		expect(rendered).toMatchSnapshot()
	})
})
