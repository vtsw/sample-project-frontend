import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import gql from 'graphql-tag'

import { getToken } from './shares/utils'
import localConfigs from './configs.local'

const typeDefs = gql`
	type User {
		id: ID
		name: String
		email: string
	}
	extend type Query {
		userSearchValue: String!
		selectedUser: User!
	}

	extend type Mutation {
		setUserSearchValue(searchValue: String!): String!
	}
`

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
	},
}

const httpLink = createHttpLink({
	uri: localConfigs.APOLLO_SERVER,
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
			__typename: 'selectedUser',
		},
	},
})

export default client
