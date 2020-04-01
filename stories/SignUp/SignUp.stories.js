import React from 'react'
import SignUp from './SignUp'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

export default {
	title: 'Component Api|SignUp',
	component: SignUp,
	decorators: [withKnobs],
}

export const signUp = () => {
	const mail = text('email', 'example@gmail.com')
	const pass = text('pass', '12345')

	const handleSignIn = ({ email, password }) => {
		action('Sign-in')({ email, password })

		if (!email) {
			alert('empty email')
			return
		}
		if (!password) {
			alert('empty password')
			return
		}

		if (mail === email && pass === password) alert('Logged in')
		else alert('Wrong pass or email')
	}

	return (
		<ThemeProvider theme={muiTheme}>
			<SignUp handleSignIn={handleSignIn} />
		</ThemeProvider>
	)
}
