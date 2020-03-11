import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { getToken } from './shares/utils'
import localConfigs from './configs.local'

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

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
})

export default client
