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

const propsDetail = [
	{
		propsName: 'handleCreate',
		propsType: 'function',
		defaultValue: 'required',
		description:
			'When you click button "Save", you will run this function, what contain value of input nearby.',
	},
	{
		propsName: 'defaultValue',
		propsType: 'string',
		defaultValue: `''`,
		description: 'It is a default value of input',
	},
]

export const basic = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<BoxCreate handleCreate={action('handleCreate')} />
		</ThemeProvider>
	)
}
