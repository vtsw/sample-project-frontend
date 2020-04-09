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

const mockUserList = [
	{
		email: 'steve@example.com',
		name: '90412',
		id: '5e68995fb6d0bc05829b6e79',
	},
	{
		email: 'nvdai2355@gmail.com',
		name: 'asdasdasd',
		id: '5e68b5c3dd814dd832cda79d',
	},
	{
		email: 'nvdai235556@gmail.com',
		name: 'nvdai235556',
		id: '5e68b792dd814d8efacda7ad',
	},
]

const mockUserTableHeader = [
	{ headerLabel: 'EMAIL', xs: 5, headerVariable: 'email' },
	{ headerLabel: 'NAME', xs: 7, headerVariable: 'name' },
]
const mockMessageTableHeader = [
	{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
	{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
]

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

export {
	mockUser,
	mockUserList,
	mockUserTableHeader,
	mockMessageTableHeader,
	renderWithApolloClient,
	renderWithRouter,
}
