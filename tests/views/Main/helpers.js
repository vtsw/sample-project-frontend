import {
	mockUserList,
	mockMessageList,
	findDOMNodeOfComponent,
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
					total: mockMessageList.length,
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

const findDOMNodeOfMain = component => {
	return findDOMNodeOfComponent({ mocks, resolvers, component })
}

export { findDOMNodeOfMain }
