import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { createMockClient } from 'mock-apollo-client'

export const withApolloProvider = ({ requestMockHandlers }) => {
	const mockClient = createMockClient()
	requestMockHandlers.mutations.forEach(mockHandler => {
		mockClient.setRequestHandler(mockHandler.type, mockHandler.handler)
	})
	requestMockHandlers.queries.forEach(mockHandler => {
		mockClient.setRequestHandler(mockHandler.type, mockHandler.handler)
	})
	return storyFn => {
		return <ApolloProvider client={mockClient}>{storyFn()}</ApolloProvider>
	}
}
