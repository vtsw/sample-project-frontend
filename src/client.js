import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { getToken } from './shares/utils'
import { APOLLO_SERVER } from './configs.local'

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
		resetCache: (_, { data }, { cache }) => {
			cache.writeData({
				data,
			})
			return data
		},
	},
}

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

const cache = new InMemoryCache()

const client = new ApolloClient({
	cache,
	link: authLink.concat(httpLink),
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
	__typename: 'Data',
}

cache.writeData({
	data: initialState,
})

export { client, initialState, resolvers }
