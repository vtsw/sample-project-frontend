import {
	mockUserList,
	mockSearchedUser,
	findDOMNodeOfComponent,
} from '@tests/shares/utils'
import { FETCH_USER_LIST } from '@views/User/gql/query'
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
			query: FETCH_USER_LIST,
			variables: {
				query: { searchText: mockSearchedUser.email, limit: PAGE_LIMIT },
			},
		},
		result: {
			data: {
				userList: {
					items: [mockSearchedUser, ...mockUserList],
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

const findDOMNodeOfUserList = component => {
	return findDOMNodeOfComponent({ mocks, resolvers, component })
}

export { findDOMNodeOfUserList }
