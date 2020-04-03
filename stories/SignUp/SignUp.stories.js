import React from 'react'
import SignUp from './SignUp'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'

export default {
	title: 'Component Api|SignUp',
	component: SignUp,
}

export const signUp = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<SignUp />
		</ThemeProvider>
	)
}
