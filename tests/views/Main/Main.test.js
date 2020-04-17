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
import { PAGE_LIMIT } from '@src/configs.local'

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
			query: MESSAGE_LIST,
			variables: {
				query: { userId: mockUserList[0].id, limit: PAGE_LIMIT },
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
}

describe('Main', () => {
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
							<Main />
						</MockedProvider>
					)
				)
			)
		})
		await wait(10)

		expect(rendered).toMatchSnapshot()
	})
})
