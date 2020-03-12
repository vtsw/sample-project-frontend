import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import gql from 'graphql-tag'

import { getToken } from './shares/utils'
import localConfigs from './configs.local'

const typeDefs = gql`
	extend type Query {
		userSearchValue: String!
	}

	extend type Mutation {
		setUserSearchValue(searchValue: String!): String!
	}
`

const resolvers = {
	// Query: {
	// 	userSearchValue: (_, {}, { userSearchValue }) => {
	// 		console.log(userSearchValue)
	// 	},
	// },
	Mutation: {
		setUserSearchValue: (_, { searchValue }, { cache }) => {
			const data = cache.readQuery({
				query: gql`
					query userSearchValue {
						userSearchValue @client
					}
				`,
			})

			cache.writeQuery({
				query: gql`
					query userSearchValue {
						userSearchValue @client
					}
				`,
				data: {
					userSearchValue: searchValue,
				},
			})
			console.log('setUserSearchValue', searchValue, data, cache)
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
	},
})

export default client
