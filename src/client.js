import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { getToken } from './shares/utils'
import { APOLLO_SERVER, APOLLO_SOCKET } from './configs.local'
import {
	GET_DRAFT_LIST,
	GET_NEW_NOTI_MESSAGE_LIST,
} from './views/Chat/gql/query'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const typeDefs = {}

const resolvers = {
	Mutation: {
		setUserSearchValue: (_, { searchValue }, { cache }) => {
			cache.writeData({
				data: {
					userSearchValue: searchValue,
				},
			})
			return searchValue
		},
		setSelectedUser: (_, { selectedUser }, { cache }) => {
			cache.writeData({
				data: {
					selectedUser,
				},
			})
			return selectedUser
		},
		setUploadedFile: (_, { file }, { cache }) => {
			if (file) {
				cache.writeData({
					data: {
						file,
					},
				})
			}
			return file
		},
		setUserSearchValueOfMain: (_, { searchValue }, { cache }) => {
			cache.writeData({
				data: {
					userSearchValueOfMain: searchValue,
				},
			})
			return searchValue
		},
		setSelectedUserOfMain: (_, { selectedUser }, { cache }) => {
			cache.writeData({
				data: {
					selectedUserOfMain: selectedUser,
				},
			})
			return selectedUser
		},
		setMessageSearchValueOfMain: (_, { searchValue }, { cache }) => {
			cache.writeData({
				data: {
					messageSearchValueOfMessage: searchValue,
				},
			})
			return searchValue
		},
		setMessageCreateValueOfMain: (_, { createValue }, { cache }) => {
			cache.writeData({
				data: {
					messageCreateValueOfMessage: createValue,
				},
			})
			return createValue
		},

		// Chat
		setSelectedUserOfChat: (_, { selectedUser }, { cache }) => {
			cache.writeData({
				data: {
					selectedUserOfChat: selectedUser,
				},
			})
		},
		setDraftList: (_, { draft }, { cache }) => {
			const { draftList } = cache.readQuery({ query: GET_DRAFT_LIST })
			let updatedDarft
			updatedDarft = {
				...draftList,
				items: draftList.items.find(i => i.toInterestId === draft.toInterestId)
					? draft.message === '[{"children":[{"text":""}]}]'
						? draftList.items.filter(i => i.toInterestId !== draft.toInterestId)
						: draftList.items.map(i => {
								if (i.toInterestId === draft.toInterestId) {
									return draft
								}
								return i
						  })
					: draft.message === '[{"children":[{"text":""}]}]'
					? draftList.items
					: [...draftList.items, draft],
			}
			cache.writeData({
				data: {
					draftList: updatedDarft,
				},
			})
		},

		setStatusReadedMessage: (
			_,
			{ readedMessage: { fromInterestedId } },
			{ cache }
		) => {
			const { newNotiMessageList } = cache.readQuery({
				query: GET_NEW_NOTI_MESSAGE_LIST,
			})

			if (newNotiMessageList.items.length === 0) return
			const findNotiMessageOfConversation = newNotiMessageList.items.find(
				noti => noti.fromInterestedId === fromInterestedId
			)

			if (findNotiMessageOfConversation) {
				cache.writeData({
					data: {
						newNotiMessageList: {
							...newNotiMessageList,
							items: newNotiMessageList.items.filter(
								noti => noti.fromInterestedId !== fromInterestedId
							),
						},
					},
				})
			}
		},

		resetCache: (_, { data }, { cache }) => {
			cache.writeData({
				data,
			})
			return data
		},
	},
}

// Create an http link:
const httpLink = createUploadLink({
	uri: APOLLO_SERVER,
	credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
	const token = getToken()
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
	uri: APOLLO_SOCKET,
	options: {
		reconnect: true,
		connectionParams: {
			Authorization: getToken() ? `Bearer ${getToken()}` : '',
		},
	},
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	wsLink,
	authLink.concat(httpLink)
)

const cache = new InMemoryCache()

const client = new ApolloClient({
	cache,
	link,
	typeDefs,
	resolvers,
})

const initialState = {
	userSearchValue: '',
	messageCreateValueOfMessage: '',
	messageSearchValueOfMessage: '',
	userSearchValueOfMain: '',
	selectedUser: {
		id: '',
		name: '',
		email: '',
		__typename: 'User',
	},
	file: {
		filename: '',
		link: '',
		__typename: 'File',
	},
	selectedUserOfMain: {
		id: '',
		name: '',
		email: '',
		__typename: 'UserOfMain',
	},

	selectedUserOfChat: {
		id: '',
		displayName: '',
		avatar: '',
		__typename: 'UserOfChat',
	},

	draftList: {
		items: [],
		__typename: 'draftList',
	},

	newNotiMessageList: {
		items: [],
		__typename: 'newMessageNotiList',
	},
	__typename: 'Data',
}

cache.writeData({
	data: initialState,
})

export { client, initialState }
