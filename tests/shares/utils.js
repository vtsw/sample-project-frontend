import React from 'react'

import { render } from '@testing-library/react'
import { ApolloProvider } from '@apollo/react-hooks'

const renderWithApolloClient = (component, mockClient) => {
	return render(
		<ApolloProvider client={mockClient}>{component}</ApolloProvider>
	)
}

export { renderWithApolloClient }
