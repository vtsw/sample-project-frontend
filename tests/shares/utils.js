import React from 'react'

import { render } from '@testing-library/react'
import { ApolloProvider } from '@apollo/react-hooks'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const mockUser = {
	email: 'stevevo@gmail.com',
	name: 'stevevo',
	password: '111',
	confirmPassword: '111',
}

const renderWithApolloClient = (component, mockClient) => {
	return render(
		<ApolloProvider client={mockClient}>{component}</ApolloProvider>
	)
}

const renderWithRouter = (
	ui,
	{
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
	} = {}
) => {
	const Wrapper = ({ children }) => (
		<Router history={history}>{children}</Router>
	)
	return {
		...render(ui, { wrapper: Wrapper }),
		history,
	}
}

export { renderWithApolloClient, renderWithRouter, mockUser }
