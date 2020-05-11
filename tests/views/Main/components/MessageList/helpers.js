import {
	mockUserList,
	mockMessageList,
	findDOMNodeOfComponent,
} from '@tests/shares/utils'
import { FETCH_USER_LIST } from '@views/User/gql/query'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { DELETE_MESSAGE, UPDATE_MESSAGE } from '@views/Message/gql/mutation'
import { PAGE_LIMIT } from '@src/configs.local'

const mockMessage = 'abc'

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
					total: mockMessageList.length,
				},
			},
		},
	},
	{
		request: {
			query: DELETE_MESSAGE,
			variables: {
				id: mockMessageList[0].id,
			},
		},
		result: {
			data: {
				deleteMessage: mockMessageList[0],
			},
		},
	},
	{
		request: {
			query: UPDATE_MESSAGE,
			variables: {
				message: { id: mockMessageList[0].id, content: mockMessage },
			},
		},
		result: {
			data: {
				updateMessage: mockMessageList[0],
			},
		},
	},
]

const resolvers = {
	Query: {
		selectedUserOfMain: () => {
			return mockUserList[0]
		},
	},
}

const findDOMNodeOfMessageList = component => {
	return findDOMNodeOfComponent({ mocks, resolvers, component })
}

export { mockMessage, findDOMNodeOfMessageList }
