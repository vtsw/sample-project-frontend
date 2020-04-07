import React from 'react'
import { action } from '@storybook/addon-actions'
import BoxCreate from './BoxCreate'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'

export default {
	title: 'Component Api|BoxCreate',
	// component: BoxCreate,
	includeStories: [],
}

export const basic = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<BoxCreate onSubmit={action('onSubmit')} />
		</ThemeProvider>
	)
}
