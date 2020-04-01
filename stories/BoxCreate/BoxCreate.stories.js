import React from 'react'
import { action } from '@storybook/addon-actions'
import BoxCreate from './BoxCreate'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'
import { WithApolloProvider } from '../common/WithApolloProvider'

export default {
	title: 'Component Api|BoxCreate',
	component: BoxCreate,
	decorators: [storyFn => <WithApolloProvider>{storyFn()}</WithApolloProvider>],
}

export const basic = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<BoxCreate handleCreate={action('handleCreate')} />
		</ThemeProvider>
	)
}
