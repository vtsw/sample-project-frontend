import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import client from '../../src/client'
import { mockServer } from 'graphql-tools'

export const WithApolloProvider = ({
	// typeDefs,
	// mocks,
	schemaOptions = {},
	mockOptions = {},
	children,
}) => {
	const typeDefs = `
    type Query {
        random: Int!
    }
`

	const mocks = {
		Query: () => ({
			random: () => 1212,
		}),
	}

	// const schema = makeExecutableSchema({ typeDefs, ...schemaOptions })

	const server = mockServer(typeDefs, mocks, false)

	const query = `{
		random
	}`
	server.query(query, {}).then(response => {
		console.log('responsesdsdsds', response)
	})

	// addMockFunctionsToSchema({
	// 	schema,
	// 	mocks,
	// 	preserveResolvers: false,
	// 	...mockOptions,
	// })

	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
