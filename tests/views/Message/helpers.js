import { mockMessageList, findDOMNodeOfComponent } from '@tests/shares/utils'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { CREATE_MESSAGE, UPDATE_MESSAGE } from '@views/Message/gql/mutation'
import { PAGE_LIMIT } from '@src/configs.local'

const mockSearchText = 'abc'
const mockMessage = 'mock message'

const mocks = [
	// Query list of message
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
	// Query list of message when loadNextMessagePage is called
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
	// Query list of message when handleSearch is called
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
	// Query list of message when createMessage is called
	{
		request: {
			query: CREATE_MESSAGE,
			variables: { message: { content: mockMessage } },
		},
		result: {
			data: {
				createMessage: {
					id: '5e6b34a80f1494052awb0ghy0',
					content: mockMessage,
					lastModified: '2020-04-20T08:10:47+00:00',
				},
			},
		},
	},
	// Query list of message when updateMessage is called
	{
		request: {
			query: UPDATE_MESSAGE,
			variables: {
				message: { id: mockMessageList[0].id, content: mockMessage },
			},
		},
		result: {
			data: {
				updateMessage: {
					id: mockMessageList[0].id,
					content: mockMessage,
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

const findDOMNodeOfMessage = component => {
	return findDOMNodeOfComponent({ mocks, resolvers, component })
}

export { mockSearchText, mockMessage, findDOMNodeOfMessage }
