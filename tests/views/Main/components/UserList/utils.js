import React from 'react'
import { findDOMNode } from 'react-dom'

import { MockedProvider } from '@apollo/react-testing'

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
				query: { searchText: mockSearchText, limit: PAGE_LIMIT },
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

const findDOMNodeOfUserList = () => {
	return findDOMNode(
		renderDOMNode(
			getMarkup(
				<MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
					<UserList />
				</MockedProvider>
			)
		)
	)
}

export { mockSearchText, findDOMNodeOfUserList }
