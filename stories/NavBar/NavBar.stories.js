import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'
import NavBarDefault from './NavBarDefault'
import './navbar.scss'
// import apolloStorybookDecorator from 'apollo-storybook-react'
import { initialState } from '../../src/client'
import { addDecorator } from '@storybook/react'
import { RESET_CACHE } from '../../src/views/components/NavBar/gql/mutation'

import gql from 'graphql-tag'
import { withApolloProvider } from '../withApolloProvider'

export default {
	title: 'Component Api|Navbar',
	includeStories: [],
}

const requestMockHandlers = {
	queries: [],
	mutations: [
		{
			type: RESET_CACHE,
			handler: () => {},
		},
	],
}

addDecorator(
	withApolloProvider({
		requestMockHandlers,
	})
)

export const NavBarStory = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<NavBarDefault />
		</ThemeProvider>
	)
}
