import React from 'react'
import { findDOMNode } from 'react-dom'

import { MockedProvider } from '@apollo/react-testing'

import Message from '@views/Message'

import { mockMessageList, renderDOMNode, getMarkup } from '@tests/shares/utils'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { CREATE_MESSAGE } from '@views/Message/gql/mutation'
import { PAGE_LIMIT } from '@src/configs.local'

const mockSearchText = 'abc'
const mockMessageText = 'mockMessageText'

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
					total: mockMessageList.length,
				},
			},
		},
	},
	{
		request: {
			query: MESSAGE_LIST,
			variables: {
				query: {
					limit: PAGE_LIMIT,
					skip: 1,
					searchText: mockSearchText,
				},
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
	{
		request: {
			query: MESSAGE_LIST,
			variables: {
				query: { searchText: mockSearchText, limit: 30 },
			},
		},
		result: {
			data: {
				messageList: {
					items: [
						{
							id: '5e6b34a80f14940526bb0ghy0',
							content: mockSearchText,
							lastModified: '2020-04-10T08:10:47+00:00',
						},
					],
					hasNext: true,
					total: 1,
				},
			},
		},
	},
	{
		request: {
			query: CREATE_MESSAGE,
			variables: { message: { content: mockMessageText } },
		},
		result: {
			data: {
				createMessage: {
					id: '5e6b34a80f1494052awb0ghy0',
					content: mockMessageText,
					lastModified: '2020-04-20T08:10:47+00:00',
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
	Mutation: {
		setMessageSearchValueOfMain: (_, { searchValue }, { cache }) => {
			cache.writeData({
				data: {
					messageSearchValueOfMessage: searchValue,
				},
			})
			return searchValue
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

export { mockSearchText, mockMessageText, findDOMNodeOfMessage }
