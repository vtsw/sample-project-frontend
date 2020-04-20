import React from 'react'
import { findDOMNode } from 'react-dom'

import { MockedProvider } from '@apollo/react-testing'

import Message from '@views/Message'

import { mockMessageList, renderDOMNode, getMarkup } from '@tests/shares/utils'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { PAGE_LIMIT } from '@src/configs.local'

const mockSearchText = 'abc'

const mocks = [
	{
		request: {
			query: MESSAGE_LIST,
			variables: {
				query: { limit: PAGE_LIMIT },
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
	{
		request: {
			query: MESSAGE_LIST,
			variables: {
				query: { searchText: mockSearchText, limit: PAGE_LIMIT },
			},
		},
		result: {
			data: {
				messageList: {
					items: mockMessageList,
					hasNext: true,
					total: mockMessageList.length,
				},
			},
		},
	},
]

const resolvers = {
	Query: {
		messageSearchValueOfMessage: () => {
			return ''
		},
	},
}

const findDOMNodeOfMessage = () => {
	return findDOMNode(
		renderDOMNode(
			getMarkup(
				<MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
					<Message />
				</MockedProvider>
			)
		)
	)
}

export { mockSearchText, findDOMNodeOfMessage }
