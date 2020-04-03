import React from 'react'
import SignIn from './SignIn'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'
import { withKnobs } from '@storybook/addon-knobs'

export default {
	title: 'Component Api|SignIn',
	// component: SignIn,
	decorators: [withKnobs],
}

export const signIn = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<SignIn />
		</ThemeProvider>
	)
}
