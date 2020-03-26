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
			cache.writeData({
				data: {
					file,
				},
			})
			return file
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

cache.writeData({
	data: {
		userSearchValue: '',
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
	},
})

export default client
