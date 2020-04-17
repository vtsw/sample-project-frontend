import React from 'react'
import { findDOMNode } from 'react-dom'

import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import { act } from '@testing-library/react'

import Main from '@views/Main'

import {
	mockUserList,
	mockMessageList,
	renderDOMNode,
	getMarkup,
} from '@tests/shares/utils'
import { FETCH_USER_LIST } from '@views/User/gql/query'
import { MESSAGE_LIST } from '@views/Message/gql/query'

const mocks = [
	{
		request: {
			query: FETCH_USER_LIST,
			variables: {
				query: { limit: 30 },
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
			query: MESSAGE_LIST,
			variables: {
				query: { userId: '5e68995fb6d0bc05829b6e79', limit: 30 },
			},
		},
		result: {
			data: {
				messageList: {
					items: mockMessageList,
					hasNext: true,
					total: 30,
				},
			},
		},
	},
	// {
	// 	request: {
	// 		query: MESSAGE_LIST,
	// 		variables: {
	// 			query: { userId: '5e68995fb6d0bc05829b6e79', limit: 10 },
	// 		},
	// 	},
	// 	result: {
	// 		data: {
	// 			messageList: {
	// 				items: mockMessageList,
	// 				hasNext: true,
	// 				total: 1,
	// 			},
	// 		},
	// 	},
	// },
]

const resolvers = {
	Query: {
		userSearchValueOfMain: () => {
			return ''
		},
		selectedUserOfMain: () => {
			return {
				id: '5e68995fb6d0bc05829b6e79',
				name: '90412',
				email: 'steve@example.com',
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

describe('Main', () => {
	it('should match snapshot', async () => {
		// jest.spyOn(window, 'alert').mockImplementation(() => 'Form is not valid!!!')
		let rendered = findDOMNode(
			renderDOMNode(
				getMarkup(
					<MockedProvider
						mocks={mocks}
						addTypename={false}
						resolvers={resolvers}
					>
						<Main />
					</MockedProvider>
				)
			)
		)
		// await act(async () => {
		// 	rendered = findDOMNode(
		// 		renderDOMNode(
		// 			getMarkup(
		// 				<MockedProvider
		// 					mocks={mocks}
		// 					addTypename={false}
		// 					resolvers={resolvers}
		// 				>
		// 					<Main />
		// 				</MockedProvider>
		// 			)
		// 		)
		// 	)
		// })
		await wait(10)
		// await waitFor(() => )
		expect(rendered).toMatchSnapshot()
	})
})
