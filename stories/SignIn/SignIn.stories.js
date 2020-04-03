import React from 'react'
import SignIn from './SignIn'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'

export default {
	title: 'Component Api|SignIn',
	includeStories: [],
}

export const signIn = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<SignIn />
		</ThemeProvider>
	)
}
